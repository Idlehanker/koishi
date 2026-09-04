// Post-build patch: rewrite relative module specifiers in cordis's emitted
// declaration files to explicit `.js` style, so they resolve under both
// `bundler` (koishi, satori) and `nodenext` (minato) module resolution.
//
//   from './context.ts'  ->  from './context.js'
//   from './context'     ->  from './context.js'
//   declare module './context'  ->  declare module './context.js'
//
// This avoids modifying the cordis submodule source code, whose `safe`
// branch mixes extensionless and `.ts` specifiers that break `nodenext`
// consumers.

import { glob } from 'node:fs/promises'
import { readFile, writeFile } from 'node:fs/promises'

const pattern = /((?:from|import|declare\s+module)\s*\(?\s*)['"](\.{1,2}\/[^'"]*?)['"]/g
const passthrough = /\.(js|mjs|cjs|json|yml|yaml|css)$/

let patched = 0
for await (const file of glob('external/cordis/packages/*/lib/**/*.d.ts')) {
  const content = await readFile(file, 'utf8')
  const next = content.replace(pattern, (match, prefix, spec) => {
    if (passthrough.test(spec)) return match
    const fixed = spec.endsWith('.ts') ? spec.slice(0, -3) + '.js' : spec + '.js'
    patched++
    return `${prefix}'${fixed}'`
  })
  if (next !== content) await writeFile(file, next)
}
console.log(`fix-cordis-dts: patched ${patched} specifier(s)`)
