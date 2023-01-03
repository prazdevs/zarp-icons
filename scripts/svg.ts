import { remove, ensureDir } from 'fs-extra'
import { readFile, writeFile, readdir } from 'fs/promises'
import { optimize, OptimizedSvg } from 'svgo'

function optimizeSvg(svg: string): string {
  return (
    (optimize(svg, {
      js2svg: { pretty: true },
      plugins: [
        'removeDoctype',
        'removeXMLProcInst',
        'removeComments',
        'removeMetadata',
        'removeEditorsNSData',
        'convertStyleToAttrs',
        'cleanupAttrs',
        'mergeStyles',
        'inlineStyles',
        'minifyStyles',
        'cleanupIDs',
        'removeRasterImages',
        'removeUselessDefs',
        'cleanupNumericValues',
        'convertColors',
        'removeUnknownsAndDefaults',
        'removeNonInheritableGroupAttrs',
        'removeUselessStrokeAndFill',
        'removeViewBox',
        'cleanupEnableBackground',
        'removeHiddenElems',
        'removeEmptyText',
        'convertShapeToPath',
        'moveElemsAttrsToGroup',
        'moveGroupAttrsToElems',
        'collapseGroups',
        'convertPathData',
        'convertEllipseToCircle',
        'convertTransform',
        'removeEmptyAttrs',
        'removeEmptyContainers',
        'mergePaths',
        'removeUnusedNS',
        'sortAttrs',
        'sortDefsChildren',
        'removeTitle',
        'removeDesc',
      ],
    })
  ) as OptimizedSvg).data
}

export async function optimizeSvgs(src: string, dest: string) {
  const sourceSvgs = await readdir(src)
  await remove(dest)
  await ensureDir(dest)
  await Promise.all(
    sourceSvgs.map(async s => {
      const svg = await readFile(`${src}/${s}`, { encoding: 'utf-8' })
      const optimized = optimizeSvg(svg)
      await writeFile(`${dest}/${s}`, optimized)
    }),
  )
}
