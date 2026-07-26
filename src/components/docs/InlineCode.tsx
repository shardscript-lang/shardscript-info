import type { ReactNode } from 'react'

export default function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="bg-[rgba(100,110,160,0.15)] text-[#7A8AB5] rounded px-2 py-0.5 font-jetbrains text-sm">
      {children}
    </code>
  )
}
