import { existsSync } from 'node:fs'
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises'
import { appRoot, appsPath as appsPath } from '../../../build/src/index'

export const getAppStorage = async () => {
  return await readFile(appsPath, 'utf-8')
}

export const setAppStorage = async (apps: string) => {
  if (!existsSync(appRoot)) {
    await mkdir(appRoot)
  }
  await writeFile(appsPath, apps,{
    encoding:'utf-8'
  })
}

export const removeAppStorage = async () => {
  await unlink(appsPath)
}