import { execa } from 'execa'
import { existsSync } from 'node:fs'
import { getStorage, setAppStorage } from '../../../utils'
import { appsPath } from '../../../../../build/src'
import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

type Keys = '-Command' | '-Count' | '-Id' | '-MatchOption' | '-Moniker' | '-Name' | '-Query' | '-Source' | '-Tag'
type CwdArgs = [Keys, string | number | string[]][]

/**
 Lists installed packages.
 
 @description This command lists all of the packages installed on your system. The output includes packages installed from WinGet sources and packages installed by other methods. Packages that have package identifiers starting with `MSIX` or `ARP` could not be correlated to a WinGet source.
 @param {CwdArgs} cwdArgs
 @returns `Microsoft.WinGet.Client.Engine.PSObjects.PSInstalledCatalogPackage`
 @example <caption>Default example</caption> 

 ``` powershell
  Get-WinGetPackage
 ```

 @example <caption>Get package by Id</caption> 

 ``` powershell
  Get-WinGetPackage -Id "Microsoft.PowerShell"
 ```

 @example <caption>Get package(s) by name</caption> 

 ``` powershell
  Get-WinGetPackage -Name "PowerShell"
 ```

 @example <caption>List all packages with an available update</caption> 

 ``` powershell
  Get-WinGetPackage | Where-Object IsUpdateAvailable
 ```

 */
export const get = async (cwdArgs?: CwdArgs) => {
  const args = cwdArgs?.map(x => x.join(' ') || '')?.join(' ') || ''
  if (existsSync(appsPath)) {
    return getStorage(appsPath)
  }

  const command = `
    $OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::new()
    Get-WinGetPackage ${args} | ConvertTo-Json
  `
  const { stdout } = await execa('powershell', ['-Command', command])
  await setAppStorage(stdout)
  return stdout
}