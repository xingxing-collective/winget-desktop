import { writeFile, mkdir } from "node:fs/promises"
import { existsSync } from 'fs'
import { appRoot, settings } from '../../../build/src/index'

export const defaultSettings = {
  name: 'vscode'
}

export const initSettings = async () => {
  if (!existsSync(appRoot)) {
    await mkdir(appRoot)
  }
  await writeFile(settings, JSON.stringify(defaultSettings, null, '\t'))
}