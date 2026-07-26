import type { ReactNode } from 'react'

export interface CalloutProps {
  tone?: 'amber' | 'blue' | 'green'
  title?: string
  children: ReactNode
}

export default function Callout({ tone = 'amber', title, children }: CalloutProps) {
  const tones: Record<string, string> = {
    amber: 'border-l-[#C4852E] bg-[rgba(196,133,46,0.08)]',
    blue: 'border-l-[#3B82F6] bg-[rgba(59,130,246,0.08)]',
    green: 'border-l-[#5B8C3E] bg-[rgba(91,140,62,0.05)]',
  }
  return (
    <div className={`mb-4 border-l-4 ${tones[tone]} px-5 py-4 rounded-r-lg`}>
      <div className="text-sm text-text-secondary">
        {title && <strong className="text-text-primary">{title}: </strong>}
        {children}
      </div>
    </div>
  )
}
