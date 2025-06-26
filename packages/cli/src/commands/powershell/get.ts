import { execa } from 'execa'
import { existsSync } from 'node:fs'
import { getStorage } from '../../utils'
import { appsPath, getTempPath } from '../../../../build/src'
import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

type Keys = '-Command' | '-Count' | '-Id' | '-MatchOption' | '-Moniker' | '-Name' | '-Query' | '-Source' | '-Tag'
type CwdArgs = [Keys, string | number | string[]][]

/**
 Lists installed packages.
 
 @description This command lists all of the packages installed on your system. The output includes packages installed from WinGet sources and packages installed by other methods. Packages that have package identifiers starting with `MSIX` or `ARP` could not be correlated to a WinGet source.
 @returns `Microsoft.WinGet.Client.Engine.PSObjects.PSInstalledCatalogPackage`
 @example <caption>Default example</caption> 

 ``` powershell
  $ Get-WinGetPackage
 ```

 */
export const get = async (cwdArgs?: CwdArgs) => {
  const path = cwdArgs ? getTempPath : appsPath
  const args = cwdArgs?.map(x => x.join(' ') || '')?.join(' ') || ''
  const dir = dirname(path)
  if (existsSync(path)) {
    return getStorage(path)
  } else {
    if (!existsSync(dir)) {
      await mkdir(dir)
    }
  }

  const command = `
    Get-WinGetPackage ${args} | ConvertTo-Json | Out-File -FilePath "${path}" -Encoding utf8
  `
  await execa('powershell', ['-Command', command])

  return getStorage(path)
}