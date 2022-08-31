import { readdir, writeFile, unlink } from 'fs/promises'
import { launch } from 'puppeteer'
import { join } from 'path'

function generateHtml(files: Array<string>) {
  const tags = files
    .map(
      icon => `<img style="width: 25px; margin: 2px;" src="icons/${icon}" />`,
    )
    .reduce((acc, cur) => acc + cur, '')

  return `
    <html>
      <body style="background-color: #011627;">
        <div style="width: 500px;">
          ${tags}
        </div>
      </body>
    </html>
  `
}

export async function generatePreviews(iconsPath: string) {
  const icons = await readdir(iconsPath)

  const [folderIcons, fileIcons] = icons.reduce(
    (acc, cur) =>
      cur.startsWith('folder')
        ? cur.endsWith('open.svg') || cur.endsWith('root.svg')
          ? acc
          : [[...acc[0], cur], acc[1]]
        : [acc[0], [...acc[1], cur]],
    [[], []],
  )

  await writeFile(
    `${process.cwd()}/files-preview.html`,
    generateHtml(fileIcons),
  )
  await writeFile(
    `${process.cwd()}/folders-preview.html`,
    generateHtml(folderIcons),
  )

  const browser = await launch()
  const page = await browser.newPage()
  await page.setViewport({ height: 10, width: 500 })
  await page.goto(join('file:', `${process.cwd()}/files-preview.html`))
  await page.screenshot({ path: 'files-preview.png', fullPage: true })
  await page.goto(join('file:', `${process.cwd()}/folders-preview.html`))
  await page.screenshot({ path: 'folders-preview.png', fullPage: true })
  await browser.close()

  await unlink(`${process.cwd()}/files-preview.html`)
  await unlink(`${process.cwd()}/folders-preview.html`)
}
