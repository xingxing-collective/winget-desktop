import { resolve } from "node:path";

export const proRoot = resolve(__dirname, '..', '..', '..')

export const pkgRoot = resolve(proRoot, 'packages')

export const appRoot = resolve(proRoot,'.winget-desktop')

export const apps = resolve(proRoot, '.winget-desktop/apps.json')

export const settings = resolve(proRoot, '.winget-desktop/settings.json')