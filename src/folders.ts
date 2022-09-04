export const folders: IconMap = {
  folder_api: ['api', 'apis', 'restapi'],
  folder_components: ['components', 'widget', 'widgets', 'fragments'],
  folder_composables: ['hook', 'hooks', 'composable', 'composables'],
  folder_coverage: ['coverage', '.nyc-output', '.nyc_output'],
  folder_cypress: ['cypress', '.cypress'],
  folder_dist: [
    '.output',
    'dist',
    'out',
    'output',
    'build',
    'release',
    'bin',
    'target',
  ],
  folder_docs: ['doc', 'docs', 'document', 'documents', 'documentation'],
  folder_examples: [
    'demo',
    'demos',
    'example',
    'examples',
    'sample',
    'samples',
    'sample-data',
  ],
  folder_fonts: ['font', 'fonts'],
  folder_functions: [
    'func',
    'funcs',
    'function',
    'functions',
    'lambda',
    'lambdas',
    'logic',
    'math',
    'maths',
    'calc',
    'calcs',
    'calculation',
    'calculations',
  ],
  folder_github: ['.github'],
  folder_husky: ['husky', '.husky'],
  folder_images: [
    'images',
    'image',
    'imgs',
    'img',
    'icons',
    'icon',
    'icos',
    'ico',
    'figures',
    'figure',
    'figs',
    'fig',
    'screenshot',
    'screenshots',
    'screengrab',
    'screengrabs',
    'pic',
    'pics',
    'picture',
    'pictures',
  ],
  folder_layouts: ['layout', 'layouts', '_layouts'],
  folder_locales: [
    'i18n',
    'internationalization',
    'lang',
    'langs',
    'language',
    'languages',
    'locale',
    'locales',
    'l10n',
    'localization',
    'translation',
    'translate',
    'translations',
  ],
  folder_node: ['node_modules'],
  folder_nuxt: ['.nuxt'],
  folder_plugins: [
    'plugin',
    'plugins',
    '_plugins',
    'extension',
    'extensions',
    'addon',
    'addons',
    'module',
    'modules',
  ],
  folder_public: ['public', 'www', 'wwwroot', 'web', 'website', 'site'],
  folder_routes: ['routes', 'router', 'routers'],
  folder_scripts: ['scripts'],
  folder_sass: ['sass', '_sass', 'scss', '_scss'],
  folder_src: ['src', 'srcs', 'source', 'sources', 'code'],
  folder_styles: ['css', 'stylesheet', 'stylesheets', 'style', 'styles'],
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
  folder_views: ['view', 'views', 'screen', 'screens', 'page', 'pages', 'html'],
  folder_vscode: ['.vscode', '.vscode-test'],
}

export const foldersExpanded: IconMap = Object.keys(folders).reduce(
  (acc, cur) => ({ ...acc, [`${cur}_open`]: folders[cur] }),
  {},
)
