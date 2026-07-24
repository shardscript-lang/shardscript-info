import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Highlight, themes } from 'prism-react-renderer'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export default function CodeBlock({
  code,
  language = 'rust',
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
        <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
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
                        // Override colors to match our palette
                        const tokenStyle = { ...tokenProps.style }
                        if (token.types.includes('keyword')) {
                          tokenStyle.color = '#D4A017'
                        } else if (token.types.includes('string')) {
                          tokenStyle.color = '#C45C5F'
                        } else if (token.types.includes('function')) {
                          tokenStyle.color = '#F5E6D3'
                        } else if (token.types.includes('comment')) {
                          tokenStyle.color = '#5A4030'
                        } else if (token.types.includes('class-name') || token.types.includes('type')) {
                          tokenStyle.color = '#9B2D30'
                        } else if (token.types.includes('number')) {
                          tokenStyle.color = '#E8C44A'
                        } else if (token.types.includes('operator') || token.types.includes('punctuation')) {
                          tokenStyle.color = '#8B7355'
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
