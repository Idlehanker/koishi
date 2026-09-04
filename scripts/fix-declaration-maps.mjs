// Post-build script: generate declaration maps for dtsc-bundled packages.
//
// dtsc compiles declarations to a temp file (index.tmp.d.ts + index.tmp.d.ts.map),
// then bundles and rewrites the output to index.d.ts, discarding the map.
// This script rescues the temp map, adjusts the `file` field, and fixes
// the sourceMappingURL comment in the final .d.ts so that Go-to-Definition
// navigates to the original .ts source files.

import { readFile, writeFile, unlink, access } from 'node:fs/promises'
import { glob } from 'node:fs/promises'
import { dirname, join } from 'node:path'

let fixed = 0

// Step 1: Convert any orphaned .tmp.d.ts.map files into proper .d.ts.map files
for await (const mapFile of glob('**/lib/index.tmp.d.ts.map', { cwd: process.cwd() })) {
  const dir = dirname(mapFile)
  const destMap = join(dir, 'index.d.ts.map')

  // Read and fix the map's "file" field
  const mapContent = await readFile(mapFile, 'utf8')
  const map = JSON.parse(mapContent)
  map.file = 'index.d.ts'
  await writeFile(destMap, JSON.stringify(map))

  // Clean up the temp map
  await unlink(mapFile)
}

// Step 2: Fix sourceMappingURL in all .d.ts files that have a corresponding .d.ts.map
for await (const mapFile of glob('**/lib/index.d.ts.map', { cwd: process.cwd() })) {
  const dir = dirname(mapFile)
  const dtsFile = join(dir, 'index.d.ts')

  try {
    await access(dtsFile)
  } catch {
    continue
  }

  let dtsContent = await readFile(dtsFile, 'utf8')
  const correctUrl = '//# sourceMappingURL=index.d.ts.map'

  // Check if there's a stale temp reference or missing reference
  if (dtsContent.includes('sourceMappingURL=index.tmp.d.ts.map')) {
    dtsContent = dtsContent.replace(
      /\/\/# sourceMappingURL=index\.tmp\.d\.ts\.map/,
      correctUrl,
    )
    await writeFile(dtsFile, dtsContent)
    fixed++
    console.log(`fix-declaration-maps: ${dtsFile}`)
  } else if (!dtsContent.includes('sourceMappingURL')) {
    if (!dtsContent.endsWith('\n')) dtsContent += '\n'
    dtsContent += correctUrl + '\n'
    await writeFile(dtsFile, dtsContent)
    fixed++
    console.log(`fix-declaration-maps: ${dtsFile}`)
  }
}

console.log(`fix-declaration-maps: fixed ${fixed} package(s)`)
