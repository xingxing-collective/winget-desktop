import { existsSync } from 'node:fs'
import { dirname } from 'node:path'
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises'
import { appsPath as appsPath } from '../../../build/src/index'

export const getStorage = async (path: string) => {
  return await readFile(path, 'utf-8')
}

export const setStorage = async (path: string, data: string) => {
  if (!existsSync(dirname(path))) {
    await mkdir(dirname(path))
  }
  await writeFile(path, data, {
    encoding: 'utf-8'
  })
}

export const removeStorage = async (path: string) => {
  await unlink(path)
}

export const getAppStorage = async () => {
  return await getStorage(appsPath)
}

export const setAppStorage = async (data: string) => {
  await setStorage(appsPath, data)
}

export const removeAppStorage = async () => {
  await removeStorage(appsPath)
}