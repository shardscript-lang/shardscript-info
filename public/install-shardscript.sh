#!/usr/bin/env bash
set -euo pipefail

# ShardScript Linux installer
# Downloads the latest published release archive, extracts it into /opt/shardscript,
# creates the SHARDSCRIPT environment variable, and symlinks 'shard' into /usr/local/bin.

RELEASE_TAG="0.4.0"
ASSET_NAME="shardscript-${RELEASE_TAG}-linux.tar.gz"
DOWNLOAD_URL="https://github.com/Rikitav/ShardScript/releases/download/${RELEASE_TAG}/${ASSET_NAME}"
INSTALL_DIR="${INSTALL_DIR:-/opt/shardscript}"
SYMLINK_DIR="${SYMLINK_DIR:-/usr/local/bin}"
PROFILE_FILE="/etc/profile.d/shardscript.sh"

log_info() {
    printf '[ShardScript] %s\n' "$1"
}

log_success() {
    printf '[ShardScript] \033[0;32m%s\033[0m\n' "$1"
}

log_warn() {
    printf '[ShardScript] \033[0;33m%s\033[0m\n' "$1" >&2
}

log_error() {
    printf '[ShardScript] \033[0;31m%s\033[0m\n' "$1" >&2
}

# Root privileges are required to write to /opt, /usr/local/bin, and /etc/profile.d.
if [[ "$EUID" -ne 0 ]]; then
    log_error "This installer must run as root. Try: sudo bash install-shardscript.sh"
    exit 1
fi

# Verify required tools are available.
for tool in curl tar; do
    if ! command -v "$tool" >/dev/null 2>&1; then
        log_error "Required tool '$tool' is not installed. Install it and run the script again."
        exit 1
    fi
done

TEMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TEMP_DIR"' EXIT

TEMP_ARCHIVE="${TEMP_DIR}/${ASSET_NAME}"

# Download the release archive.
log_info "Downloading ${ASSET_NAME} from GitHub ..."
if ! curl -fsSL "$DOWNLOAD_URL" -o "$TEMP_ARCHIVE"; then
    log_error "Failed to download ShardScript from ${DOWNLOAD_URL}. Ensure the release tag '${RELEASE_TAG}' exists and you have network access."
    exit 1
fi

ARCHIVE_SIZE="$(stat -c%s "$TEMP_ARCHIVE" 2>/dev/null || stat -f%z "$TEMP_ARCHIVE" 2>/dev/null)"
if [[ "$ARCHIVE_SIZE" -eq 0 ]]; then
    log_error "Downloaded archive is empty."
    exit 1
fi
log_info "Downloaded ${ARCHIVE_SIZE} bytes"

# Prepare the install directory.
if [[ -d "$INSTALL_DIR" ]]; then
    log_warn "Install directory already exists: ${INSTALL_DIR}"
    log_warn "Existing files will be overwritten by the archive contents."
else
    mkdir -p "$INSTALL_DIR"
    log_info "Created installation directory: ${INSTALL_DIR}"
fi

# Extract the archive into the install directory.
log_info "Extracting archive to ${INSTALL_DIR} ..."
tar -xzf "$TEMP_ARCHIVE" -C "$INSTALL_DIR"

# Ensure the interpreter is executable.
SHARD_BINARY="${INSTALL_DIR}/shard"
if [[ ! -f "$SHARD_BINARY" ]]; then
    log_error "Installation appears incomplete: 'shard' was not found at ${SHARD_BINARY}"
    exit 1
fi
chmod +x "$SHARD_BINARY"
log_success "Found interpreter at ${SHARD_BINARY}"

# Create a system-wide symlink so 'shard' is on PATH.
if [[ -d "$SYMLINK_DIR" ]]; then
    ln -sf "$SHARD_BINARY" "${SYMLINK_DIR}/shard"
    log_success "Created symlink: ${SYMLINK_DIR}/shard -> ${SHARD_BINARY}"
else
    log_warn "Symlink directory does not exist: ${SYMLINK_DIR}. 'shard' will not be on PATH."
fi

# Persist the SHARDSCRIPT environment variable for all users.
cat > "$PROFILE_FILE" <<EOF
# ShardScript environment variables
export SHARDSCRIPT="${INSTALL_DIR}"
EOF

# Apply the environment variable to the current shell so the user can verify immediately.
export SHARDSCRIPT="$INSTALL_DIR"

log_success "Set SHARDSCRIPT=${INSTALL_DIR}"
log_success "ShardScript ${RELEASE_TAG} installed successfully."
log_info "Open a new terminal, or run 'source ${PROFILE_FILE}' to use the updated environment."
log_info "Run 'shard --help' to verify the installation."
