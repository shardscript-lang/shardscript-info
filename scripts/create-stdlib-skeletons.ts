import fs from 'node:fs'
import path from 'node:path'

const docsRoot = path.resolve('src/docs/stdlib')

interface Article {
  file: string
  title: string
  group: string
  order: number
  slug: string
}

const groupOrderMap: Record<string, number> = {
  'SHARD.MATH': 1,
  'SHARD.ENVIRONMENT': 2,
  'SHARD.DEBUG': 3,
  'SHARD.COLLECTIONS': 4,
  'SHARD.JSON': 5,
  'SHARD.STREAMS': 6,
  'SHARD.FILESYSTEM': 7,
  'SHARD.SUBPROCESS': 8,
  'SHARD.ASYNC': 9,
  'SHARD.INTEROP': 10,
  'SHARD.HTTP': 11,
  'SHARD.SOCKET': 12,
  'SHARD.REFLECTION': 13,
}

const articles: Article[] = [
  // SHARD.ENVIRONMENT
  { file: 'environment/environment.mdx', title: 'Environment', group: 'SHARD.ENVIRONMENT', order: 1, slug: 'environment' },

  // SHARD.DEBUG
  { file: 'debug/developer-tools.mdx', title: 'Developer Tools', group: 'SHARD.DEBUG', order: 1, slug: 'developer-tools' },
  { file: 'debug/vm-inspection.mdx', title: 'VM Inspection', group: 'SHARD.DEBUG', order: 2, slug: 'vm-inspection' },

  // SHARD.COLLECTIONS
  { file: 'collections/ienumerable-and-ienumerator.mdx', title: 'IEnumerable & IEnumerator', group: 'SHARD.COLLECTIONS', order: 1, slug: 'ienumerable-and-ienumerator' },
  { file: 'collections/list.mdx', title: 'List<T>', group: 'SHARD.COLLECTIONS', order: 2, slug: 'list' },
  { file: 'collections/dictionary.mdx', title: 'Dictionary<K, V>', group: 'SHARD.COLLECTIONS', order: 3, slug: 'dictionary' },
  { file: 'collections/queue-and-stack.mdx', title: 'Queue<T> & Stack<T>', group: 'SHARD.COLLECTIONS', order: 4, slug: 'queue-and-stack' },

  // SHARD.JSON
  { file: 'json/json-serializer.mdx', title: 'JsonSerializer', group: 'SHARD.JSON', order: 1, slug: 'json-serializer' },
  { file: 'json/json-node.mdx', title: 'JsonNode', group: 'SHARD.JSON', order: 2, slug: 'json-node' },

  // SHARD.STREAMS
  { file: 'streams/stream-interfaces.mdx', title: 'Stream Interfaces', group: 'SHARD.STREAMS', order: 1, slug: 'stream-interfaces' },
  { file: 'streams/memory-stream.mdx', title: 'MemoryStream', group: 'SHARD.STREAMS', order: 2, slug: 'memory-stream' },
  { file: 'streams/stream-reader-writer.mdx', title: 'StreamReader / StreamWriter', group: 'SHARD.STREAMS', order: 3, slug: 'stream-reader-writer' },
  { file: 'streams/binary-reader-writer.mdx', title: 'BinaryReader / BinaryWriter', group: 'SHARD.STREAMS', order: 4, slug: 'binary-reader-writer' },

  // SHARD.FILESYSTEM
  { file: 'filesystem/file-and-path.mdx', title: 'File & Path', group: 'SHARD.FILESYSTEM', order: 1, slug: 'file-and-path' },
  { file: 'filesystem/directory-and-directoryinfo.mdx', title: 'Directory & DirectoryInfo', group: 'SHARD.FILESYSTEM', order: 2, slug: 'directory-and-directoryinfo' },
  { file: 'filesystem/path-concatenation.mdx', title: 'Path Concatenation', group: 'SHARD.FILESYSTEM', order: 3, slug: 'path-concatenation' },

  // SHARD.SUBPROCESS
  { file: 'subprocess/process-and-processstartinfo.mdx', title: 'Process & ProcessStartInfo', group: 'SHARD.SUBPROCESS', order: 1, slug: 'process-and-processstartinfo' },
  { file: 'subprocess/subprocess-io-and-lifecycle.mdx', title: 'I/O & Lifecycle', group: 'SHARD.SUBPROCESS', order: 2, slug: 'subprocess-io-and-lifecycle' },

  // SHARD.ASYNC
  { file: 'async/task-completion-source.mdx', title: 'TaskCompletionSource<T>', group: 'SHARD.ASYNC', order: 1, slug: 'task-completion-source' },
  { file: 'async/cancellation-token-and-source.mdx', title: 'CancellationToken & CancellationTokenSource', group: 'SHARD.ASYNC', order: 2, slug: 'cancellation-token-and-source' },

  // SHARD.INTEROP
  { file: 'interop/native-interop.mdx', title: 'Native Interop', group: 'SHARD.INTEROP', order: 1, slug: 'native-interop' },

  // SHARD.HTTP
  { file: 'http/http-client.mdx', title: 'HttpClient', group: 'SHARD.HTTP', order: 1, slug: 'http-client' },
  { file: 'http/http-server.mdx', title: 'HttpServer', group: 'SHARD.HTTP', order: 2, slug: 'http-server' },

  // SHARD.SOCKET
  { file: 'socket/tcp-sockets.mdx', title: 'TCP Sockets', group: 'SHARD.SOCKET', order: 1, slug: 'tcp-sockets' },

  // SHARD.REFLECTION
  { file: 'reflection/type-introspection.mdx', title: 'Type Introspection', group: 'SHARD.REFLECTION', order: 1, slug: 'type-introspection' },
]

for (const article of articles) {
  const fullPath = path.join(docsRoot, article.file)
  fs.mkdirSync(path.dirname(fullPath), { recursive: true })
  const content = `---
title: ${article.title}
group: ${article.group}
groupOrder: ${groupOrderMap[article.group]}
order: ${article.order}
slug: ${article.slug}
type: Reference
---

<Prose>
  Placeholder content for ${article.title}.
</Prose>
`
  fs.writeFileSync(fullPath, content)
  console.log(`Created ${article.file}`)
}
