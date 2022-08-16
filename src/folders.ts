export const folders: IconMap = {
  folder_dist: ['dist', 'out', 'build', 'release', 'bin', 'target'],
  folder_node: ['node_modules'],
  folder_src: ['src', 'srcs', 'source', 'sources', 'code'],
  folder_test: [
    'test',
    'tests',
    'testing',
    '__tests__',
    '__snapshots__',
    '__mocks__',
    '__fixtures__',
    '__test__',
    'spec',
    'specs',
  ],
}

export const foldersExpanded: IconMap = Object.keys(
  folders,
).reduce((acc, cur) => ({ ...acc, [`${cur}_open`]: folders[cur] }), {})
