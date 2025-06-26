import { execa } from 'execa'
import { findTempPath } from '../../../../build/src'
import { existsSync } from 'node:fs'
import { getStorage } from '../../utils'
import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

type CwdArgs = Array<{
  k: '--id' | '--name' | '--moniker' | '--tag' | '--cmd' | '--command' | '-s' | '--source' | '-n' | '--count' | '-e' | '--exact'
  v: string
}>

export const find = async (query: string, cwdArgs?: CwdArgs) => {
  const dir = dirname(findTempPath)
  const args = cwdArgs?.map(x => Object.values(x)).flat() || []
  if (existsSync(findTempPath)) {
    return getStorage(findTempPath)
  } else {
    if (!existsSync(dir)) {
      await mkdir(dir)
    }
  }
  const command = `
    Find-WinGetPackage ${query} | ConvertTo-Json | Out-File -FilePath "${findTempPath}" -Encoding utf8
  `
  await execa('powershell', ['-Command', command])
}