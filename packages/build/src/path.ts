import { resolve } from "node:path";

export const proRoot = resolve(__dirname, '..', '..', '..')

export const pkgRoot = resolve(proRoot, 'packages')

export const appRoot = resolve(proRoot, '.winget-desktop')

export const appsPath = resolve(appRoot, 'apps.json')

export const settingsPath = resolve(appRoot, 'settings.json')