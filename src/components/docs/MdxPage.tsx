import type { ComponentType } from 'react'
import CodeBlock from '../CodeBlock'
import Callout from './Callout'
import InlineCode from './InlineCode'
import H2 from './H2'
import Prose from './Prose'
import Bullet from './Bullet'
import DocsTable from './DocsTable'

const components = {
  CodeBlock,
  Callout,
  InlineCode,
  H2,
  Prose,
  Bullet,
  DocsTable,
}

interface MdxPageProps {
  Component: ComponentType<{ components?: typeof components }>
}

export default function MdxPage({ Component }: MdxPageProps) {
  return (
    <div className="space-y-10">
      <Component components={components} />
    </div>
  )
}

export { components }
