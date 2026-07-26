import type { ReactNode } from 'react'

export default function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-space text-2xl font-semibold text-text-primary mb-4">{children}</h2>
  )
}
