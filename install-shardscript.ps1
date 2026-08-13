#Requires -RunAsAdministrator
<#
.SYNOPSIS
    Installs the ShardScript interpreter from the latest published GitHub release.

.DESCRIPTION
    Queries the official ShardScript GitHub repository for the latest published release,
    downloads shardscript-<tag>-windows.zip, extracts it into %ProgramFiles%\ShardScript,
    and creates the SHARDSCRIPT system environment variable pointing at that directory.
    The script must run as Administrator because it writes to %ProgramFiles% and updates
    machine-level environment variables.

.PARAMETER InstallDir
    Directory where ShardScript will be installed. Defaults to %ProgramFiles%\ShardScript.

.PARAMETER AddToPath
    When set, appends %SHARDSCRIPT% to the machine PATH so `shard` is available from any prompt.

.PARAMETER Version
    Specific release tag to install (for example, "0.5.2"). When omitted, the latest
    non-prerelease tag is fetched from the GitHub API.

.EXAMPLE
    .\install-shardscript.ps1

.EXAMPLE
    .\install-shardscript.ps1 -InstallDir "C:\Tools\ShardScript" -AddToPath
#>
param(
    [string]$InstallDir = "$env:ProgramFiles\ShardScript",
    [switch]$AddToPath,
    [string]$Version = ""
)

$ErrorActionPreference = "Stop"

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

function Write-Info
{
    param([string]$Message)
    Write-Host "[ShardScript] $Message" -ForegroundColor Cyan
}

function Write-Success
{
    param([string]$Message)
    Write-Host "[ShardScript] $Message" -ForegroundColor Green
}

function Write-WarningLine
{
    param([string]$Message)
    Write-Host "[ShardScript] $Message" -ForegroundColor Yellow
}

function Get-LatestReleaseTag
{
    $apiUrl = "https://api.github.com/repos/Rikitav/ShardScript/releases/latest"
    try
    {
        $release = Invoke-RestMethod -Uri $apiUrl -UseBasicParsing
        return $release.tag_name
    }
    catch
    {
        Write-Error "Failed to query the latest ShardScript release from GitHub. You can pass a specific -Version to skip this check."
        exit 1
    }
}

if ([string]::IsNullOrWhiteSpace($Version))
{
    $ReleaseTag = Get-LatestReleaseTag
    Write-Info "Latest release is $ReleaseTag"
}
else
{
    $ReleaseTag = $Version
    Write-Info "Installing requested release $ReleaseTag"
}

$AssetName = "shardscript-$ReleaseTag-windows.zip"
$DownloadUrl = "https://github.com/Rikitav/ShardScript/releases/download/$ReleaseTag/$AssetName"
$TempZip = Join-Path $env:TEMP $AssetName

# Verify the script is running with administrative privileges.
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal(
    [Security.Principal.WindowsIdentity]::GetCurrent()
)
if (-not $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    Write-Error "This installer must run as Administrator. Right-click PowerShell and select 'Run as administrator'."
    exit 1
}

# Ensure the install directory exists and is empty of a previous interpreter layout.
if (Test-Path $InstallDir)
{
    Write-WarningLine "Install directory already exists: $InstallDir"
    Write-WarningLine "Existing files will be overwritten by the archive contents."
}
else
{
    New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
    Write-Info "Created installation directory: $InstallDir"
}

# Download the release archive.
Write-Info "Downloading $AssetName from GitHub ..."
try
{
    Invoke-WebRequest -Uri $DownloadUrl -OutFile $TempZip -UseBasicParsing
}
catch
{
    Write-Error "Failed to download ShardScript from $DownloadUrl. Ensure the release tag '$ReleaseTag' exists and you have network access."
    exit 1
}

$archiveSize = (Get-Item $TempZip).Length
if ($archiveSize -eq 0)
{
    Write-Error "Downloaded archive is empty."
    exit 1
}
Write-Info "Downloaded $archiveSize bytes to $TempZip"

# Extract the archive into the install directory.
Write-Info "Extracting archive to $InstallDir ..."
Expand-Archive -Path $TempZip -DestinationPath $InstallDir -Force

# Clean up the temporary download.
Remove-Item -Path $TempZip -Force
Write-Info "Removed temporary archive"

# Verify the interpreter is present.
$shardExe = Join-Path $InstallDir "shard.exe"
if (-not (Test-Path $shardExe))
{
    Write-Error "Installation appears incomplete: shard.exe was not found at $shardExe"
    exit 1
}
Write-Success "Found interpreter at $shardExe"

# Set the SHARDSCRIPT machine environment variable.
[System.Environment]::SetEnvironmentVariable("SHARDSCRIPT", $InstallDir, [System.EnvironmentVariableTarget]::Machine)
Write-Success "Set SHARDSCRIPT=$InstallDir (Machine scope)"

# Optionally register the install directory on the machine PATH.
if ($AddToPath)
{
    $currentPath = [System.Environment]::GetEnvironmentVariable("Path", [System.EnvironmentVariableTarget]::Machine)
    $pathEntries = $currentPath -split ';' | Where-Object { $_ -ne "" }

    if ($pathEntries -notcontains $InstallDir)
    {
        $newPath = "$currentPath;$InstallDir"
        [System.Environment]::SetEnvironmentVariable("Path", $newPath, [System.EnvironmentVariableTarget]::Machine)
        Write-Success "Added $InstallDir to machine PATH"
    }
    else
    {
        Write-WarningLine "$InstallDir is already present in machine PATH"
    }
}

Write-Success "ShardScript $ReleaseTag installed successfully."
Write-Info "Open a new PowerShell or Command Prompt window to use the updated environment variables."

if (-not $AddToPath)
{
    Write-Info "Tip: run with -AddToPath to make 'shard' available from any command prompt."
}
