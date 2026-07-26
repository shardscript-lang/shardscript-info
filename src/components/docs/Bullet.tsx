import type { ReactNode } from 'react'

export default function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-gold mt-1.5">&bull;</span>
      <span>{children}</span>
    </li>
  )
}
