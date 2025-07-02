import { writeFile, mkdir } from "node:fs/promises"
import { existsSync } from 'fs'
import { appRoot, settingsPath } from '../path'

export const defaultSettings = {
  name: 'vscode'
}

export const initSettings = async () => {
  if (!existsSync(appRoot)) {
    await mkdir(appRoot)
  }
  await writeFile(settingsPath, JSON.stringify(defaultSettings, null, '\t'))
}