import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Highlight, themes, Prism } from 'prism-react-renderer'

// ShardScript grammar for Prism. The MDX files currently tag ShardScript snippets as
// `csharp` for lack of a dedicated language, so we also map `csharp` to this grammar.
Prism.languages.shardscript = {
  comment: {
    pattern: /\/\/[^\r\n]*|\/\*[\s\S]*?\*\//,
    greedy: true,
  },
  string: {
    pattern: /"(?:""|[^"])*"/,
    greedy: true,
  },
  char: {
    pattern: /'(?:[^'\\]|\\.)'/,
    greedy: true,
  },
  keyword:
    /\b(?:func|class|struct|interface|enum|namespace|using|public|private|protected|internal|static|extern|abstract|virtual|override|new|init|return|if|else|for|while|foreach|in|break|continue|try|catch|throw|defer|async|await|task|valuetask|true|false|null|as|is|switch|case|default|operator|this|base|get|set|property|where|yield)\b/,
  builtin:
    /\b(?:int|double|bool|string|char|byte|void|any|object|nint|Task|ValueTask|CancellationToken|IDisposable|IEnumerable|IEnumerator|JsonNode|HttpClient|HttpResponse|Socket|SocketStream|MemoryStream|StreamReader|StreamWriter|BinaryReader|BinaryWriter|File|Directory|Path|Environment|Process|TaskCompletionSource|CancellationTokenSource)\b/,
  number: {
    pattern: /\b0x[\da-fA-F]+|\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
  },
  operator: /\*\*|\+\+|--|->|==|!=|<=|>=|&&|\|\||[-+*/%=<>!&|^~]=?|\.\./,
  punctuation: /[{}[\];(),.:]/,
  function: /\b[A-Za-z_]\w*(?=\()/,
}

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

function resolveLanguage(language?: string): string {
  if (!language || language === 'csharp') {
    return 'shardscript'
  }
  return language
}

export default function CodeBlock({
  code,
  language = 'shardscript',
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mb-4 rounded-code overflow-hidden border border-[#333350] bg-[#0D0D18] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#2D2D45] border-b border-[#3A3A50]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#B83A3A]" />
          <div className="w-3 h-3 rounded-full bg-[#C4852E]" />
          <div className="w-3 h-3 rounded-full bg-[#5B8C3E]" />
          {filename && (
            <span className="ml-3 text-xs font-medium tracking-wide text-text-muted font-jetbrains">
              {filename}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-text-muted hover:text-text-primary transition-colors duration-200"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto p-5">
        <Highlight theme={themes.vsDark} code={code.trim()} language={resolveLanguage(language)}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} font-jetbrains text-sm leading-relaxed`}
              style={{ ...style, background: 'transparent', margin: 0, padding: 0 }}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line })
                return (
                  <div
                    key={i}
                    {...lineProps}
                    className={`${lineProps.className} table-row`}
                  >
                    {showLineNumbers && (
                      <span className="table-cell text-right pr-4 text-text-muted select-none text-xs w-8">
                        {i + 1}
                      </span>
                    )}
                    <span className="table-cell">
                      {line.map((token, key) => {
                        const tokenProps = getTokenProps({ token })
                        // Override colors for high contrast on the dark code background.
                        const tokenStyle = { ...tokenProps.style }
                        if (token.types.includes('keyword')) {
                          tokenStyle.color = '#F0C674'
                        } else if (token.types.includes('builtin')) {
                          tokenStyle.color = '#81A2BE'
                        } else if (token.types.includes('string') || token.types.includes('char')) {
                          tokenStyle.color = '#B5BD68'
                        } else if (token.types.includes('function')) {
                          tokenStyle.color = '#DE935F'
                        } else if (token.types.includes('comment')) {
                          tokenStyle.color = '#969896'
                          tokenStyle.fontStyle = 'italic'
                        } else if (token.types.includes('class-name')) {
                          tokenStyle.color = '#8ABEB7'
                        } else if (token.types.includes('number')) {
                          tokenStyle.color = '#DE935F'
                        } else if (token.types.includes('operator')) {
                          tokenStyle.color = '#C5C8C6'
                        } else if (token.types.includes('punctuation')) {
                          tokenStyle.color = '#C5C8C6'
                        }
                        return (
                          <span key={key} {...tokenProps} style={tokenStyle} />
                        )
                      })}
                    </span>
                  </div>
                )
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}
