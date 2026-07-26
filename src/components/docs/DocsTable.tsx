import type { ReactNode } from 'react'

interface DocsTableProps {
  headers: ReactNode[]
  rows: ReactNode[][]
}

export default function DocsTable({ headers, rows }: DocsTableProps) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
        <thead>
          <tr className="bg-[#2D2D45]">
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-sm text-text-secondary">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
