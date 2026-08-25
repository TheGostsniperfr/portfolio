import { readdir, stat, mkdir, writeFile, readFile, copyFile } from 'node:fs/promises'
import { dirname, extname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

/*
 * Sources live outside public/ on purpose: Nuxt copies public/ verbatim, so keeping the
 * originals there shipped 77 MB of untouched PNGs on every deploy. This script is the only
 * thing that writes public/images/, and it emits both the responsive variants and a
 * recompressed fallback at the original path, so every existing /images/... reference in the
 * codebase keeps resolving.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = join(root, 'source-images')
const outputDir = join(root, 'public', 'images')
const manifestPath = join(root, 'data', 'image-manifest.json')

const TARGET_WIDTHS = [ 640, 1280, 1920 ]
/** The <img src> fallback only has to look right; the variants carry the quality. */
const FALLBACK_WIDTH = 1200
const FORMATS = [
  { ext: 'avif', encode: (pipe) => pipe.avif({ quality: 55, effort: 4 }) },
  { ext: 'webp', encode: (pipe) => pipe.webp({ quality: 78 }) },
]
const RASTER_EXTENSIONS = new Set([ '.png', '.jpg', '.jpeg' ])
const CONCURRENCY = 4

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? collectFiles(path) : [ path ]
  }))
  return files.flat()
}

/** Never upscale: a 612px source yields a single 612px variant, not three blurry ones. */
function widthsFor(sourceWidth) {
  const smaller = TARGET_WIDTHS.filter((w) => w < sourceWidth)
  return [ ...smaller, Math.min(sourceWidth, TARGET_WIDTHS.at(-1)) ]
}

async function isStale(outPath, sourceMtime) {
  try {
    const { mtimeMs } = await stat(outPath)
    return mtimeMs < sourceMtime
  } catch {
    return true
  }
}

function encodeFallback(pipe, ext) {
  return ext === '.png'
    ? pipe.png({ quality: 80, compressionLevel: 9, palette: true })
    : pipe.jpeg({ quality: 82, mozjpeg: true })
}

async function processFile(sourcePath) {
  const relPath = relative(sourceDir, sourcePath)
  const posixRel = relPath.split(sep).join('/')
  const ext = extname(relPath).toLowerCase()
  const { mtimeMs } = await stat(sourcePath)
  let written = 0

  // Anything sharp cannot resize (SVG, ico…) is copied through untouched.
  if (!RASTER_EXTENSIONS.has(ext)) {
    const outPath = join(outputDir, relPath)
    if (await isStale(outPath, mtimeMs)) {
      await mkdir(dirname(outPath), { recursive: true })
      await copyFile(sourcePath, outPath)
      written++
    }
    return { entry: null, written }
  }

  const { width, height } = await sharp(sourcePath).metadata()
  if (!width || !height) {
    console.warn(`[images] dimensions illisibles, ignoré : ${posixRel}`)
    return { entry: null, written }
  }

  const baseName = relPath.slice(0, -ext.length)
  const widths = widthsFor(width)

  const fallbackPath = join(outputDir, relPath)
  if (await isStale(fallbackPath, mtimeMs)) {
    await mkdir(dirname(fallbackPath), { recursive: true })
    await encodeFallback(
      sharp(sourcePath).resize({ width: FALLBACK_WIDTH, withoutEnlargement: true }),
      ext,
    ).toFile(fallbackPath)
    written++
  }

  for (const targetWidth of widths) {
    for (const { ext: outExt, encode } of FORMATS) {
      const outPath = join(outputDir, `${baseName}-${targetWidth}.${outExt}`)
      if (!await isStale(outPath, mtimeMs)) continue
      await mkdir(dirname(outPath), { recursive: true })
      await encode(sharp(sourcePath).resize({ width: targetWidth, withoutEnlargement: true })).toFile(outPath)
      written++
    }
  }

  return {
    entry: [
      `/images/${posixRel}`,
      { width, height, widths, base: `/images/${baseName.split(sep).join('/')}` },
    ],
    written,
  }
}

async function runPool(items, worker) {
  const results = []
  let cursor = 0
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (cursor < items.length) results.push(await worker(items[ cursor++ ]))
  }))
  return results
}

async function main() {
  const sources = await collectFiles(sourceDir)
  const started = Date.now()
  const results = await runPool(sources, processFile)

  const manifest = Object.fromEntries(
    results.filter((r) => r.entry).map((r) => r.entry).sort(([ a ], [ b ]) => a.localeCompare(b)),
  )
  const written = results.reduce((sum, r) => sum + r.written, 0)

  const serialized = `${JSON.stringify(manifest, null, 2)}\n`
  const previous = await readFile(manifestPath, 'utf8').catch(() => null)
  if (previous !== serialized) {
    await mkdir(dirname(manifestPath), { recursive: true })
    await writeFile(manifestPath, serialized)
  }

  console.log(
    `[images] ${sources.length} sources, ${written} fichiers écrits en ${((Date.now() - started) / 1000).toFixed(1)}s`,
  )
}

main().catch((error) => {
  console.error('[images] échec de l\'optimisation :', error)
  process.exit(1)
})
