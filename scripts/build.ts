import { optimizeSvgs } from './svg'
import { generatePreviews } from './preview'
import { base } from '../src/base'
import { extensions } from '../src/extensions'
import { folders, foldersExpanded } from '../src/folders'
import { files } from '../src/files'
import { readdir, writeFile } from 'fs/promises'
import { languages } from '../src/languages'

type MapType =
  | 'extensions'
  | 'folders'
  | 'folderExpanded'
  | 'files'
  | 'languages'

function verifyMap(
  map: IconMap,
  svgs: string[],
  mapType: MapType,
): never | void {
  const icons = svgs.map(x => x.slice(0, -4))
  for (const k of Object.keys(map)) {
    if (!icons.includes(k))
      throw new Error(`Missing icon for '${k}' in '${mapType}'.`)
  }
}

function buildMap(icon: string, references: string[]): Record<string, string> {
  return references.reduce((acc, cur) => ({ ...acc, [cur]: icon }), {})
}

function buildMaps(iconMap: IconMap): Record<string, string> {
  return Object.keys(iconMap).reduce(
    (acc, icon) => ({ ...acc, ...buildMap(icon, iconMap[icon]) }),
    {},
  )
}

const iconSourcesPath = `${process.cwd()}/src/icons`
const iconsPath = `${process.cwd()}/icons`

//* optimize svgs from `src/icons` into `icons`
await optimizeSvgs(iconSourcesPath, iconsPath)

const icons = await readdir(iconsPath)

//* check for missing icons
verifyMap(extensions, icons, 'extensions')
verifyMap(files, icons, 'files')
verifyMap(folders, icons, 'folders')
verifyMap(foldersExpanded, icons, 'folderExpanded')
verifyMap(languages, icons, 'languages')

//* generate theme
const iconDefinitions: IconDefinitions = icons.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.slice(0, -4)]: { iconPath: `./icons/${cur}` },
  }),
  {},
)
const theme: Theme = {
  ...base,
  iconDefinitions,
  fileExtensions: buildMaps(extensions),
  fileNames: buildMaps(files),
  folderNames: buildMaps(folders),
  folderNamesExpanded: buildMaps(foldersExpanded),
  languageIds: buildMaps(languages),
}
await writeFile('./theme.json', JSON.stringify(theme, null, 2))

//* generate preview
await generatePreviews(iconsPath)
