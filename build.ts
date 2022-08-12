import { remove, mkdirs } from 'fs-extra'
import { readFile, writeFile, readdir } from 'fs/promises'
import { optimize, OptimizedSvg } from 'svgo'

const dist = `${process.cwd()}/dist`

async function optimizeSvg(path: string) {
  const file = await readFile(`./icon_sources/${path}`)
  const optimized = optimize(file, {
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
  }) as OptimizedSvg
  await writeFile(`${dist}/icons/${path}`, optimized.data)
}

//* optimize SVGs
const sourceIcons = await readdir('./icon_sources')
await remove(dist)
await mkdirs(`${dist}/icons`)
await Promise.all(sourceIcons.map(optimizeSvg))

// const iconFiles = readdirSync('./icons')
// const iconDefinitions = iconFiles.reduce(
//   (acc, cur) => ({
//     ...acc,
//     [cur.slice(0, -4)]: `./icons/${cur}`,
//   }),
//   {},
// )

// const r = {
//   ...theme,
//   iconDefinitions,
// }

// writeFileSync('theme.json', JSON.stringify(r, null, 2))
