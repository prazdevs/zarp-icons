import { optimizeSvgs } from './svg'
import { base } from '../src/base'
import { extensions } from '../src/extensions'
import { folders, foldersExpanded } from '../src/folders'
import { files } from '../src/files'
import { readdir, writeFile } from 'fs/promises'
import { languages } from '../src/languages'

const iconSourcesPath = `${process.cwd()}/src/icons`
const iconsPath = `${process.cwd()}/icons`

//* optimize SVGs
await optimizeSvgs(iconSourcesPath, iconsPath)

function buildMap(icon: string, references: string[]): Record<string, string> {
  return references.reduce((acc, cur) => ({ ...acc, [cur]: icon }), {})
}

function buildMaps(iconMap: IconMap): Record<string, string> {
  return Object.keys(iconMap).reduce((acc, icon) => ({ ...acc, ...buildMap(icon, iconMap[icon]) }), {})
}

const icons = await readdir(iconsPath)
const iconDefinitions: IconDefinitions = icons.reduce((acc, cur) => ({ ...acc, [cur.slice(0, -4)]: { iconPath: `./icons/${cur}`} }), {})


const theme: Theme = {
  ...base,
  iconDefinitions,
  fileExtensions: buildMaps(extensions),
  fileNames: buildMaps(files),
  folderNames: buildMaps(folders),
  folderNamesExpanded: buildMaps(foldersExpanded),
  languageIds: buildMaps(languages)
}

await writeFile('./theme.json', JSON.stringify(theme, null, 2))
