import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { appRoot, apps as appsPath } from '../../../build/src/index'


export const exist = () => {
  return existsSync(appsPath)
}

export const setAppStorage = async (apps: string) => {
  if (!existsSync(appRoot)) {
    await mkdir(appRoot)
  }
  await writeFile(appsPath, apps)
}