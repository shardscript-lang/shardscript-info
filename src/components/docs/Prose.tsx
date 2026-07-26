import type { ReactNode } from 'react'

export default function Prose({ children }: { children: ReactNode }) {
  return <div className="text-base text-text-secondary leading-relaxed mb-4">{children}</div>
}
