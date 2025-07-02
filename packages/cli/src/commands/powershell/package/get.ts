import { execa } from 'execa'
import { existsSync } from 'node:fs'
import { getStorage, reviver, setAppStorage } from '../../../utils'
import { appsPath } from '../../../path'

export type GetPackageParameters = '-Command' | '-Count' | '-Id' | '-MatchOption' | '-Moniker' | '-Name' | '-Query' | '-Source' | '-Tag'
export type GetPackageCwdArgs = [GetPackageParameters, string | number | string[]][]

export type InstalledCatalogPackage = {
  name: string
  id: string
  version: string
  available: string
  source: string
}[]

/**
 Lists installed packages.
 
 @description This command lists all of the packages installed on your system. The output includes packages installed from WinGet sources and packages installed by other methods. Packages that have package identifiers starting with `MSIX` or `ARP` could not be correlated to a WinGet source.
 @param { GetPackageCwdArgs } cwdArgs
 @returns `Microsoft.WinGet.Client.Engine.PSObjects.PSInstalledCatalogPackage`
 https://www.powershellgallery.com/packages/Microsoft.WinGet.Client/1.9.2505/Content/Format.ps1xml
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
export const get = async (cwdArgs?: GetPackageCwdArgs): Promise<InstalledCatalogPackage> => {
  const args = cwdArgs?.map(x => x.join(' ') || '')?.join(' ') || ''
  if (existsSync(appsPath)) {
    const apps = await getStorage(appsPath)
    return JSON.parse(apps, reviver)
  }

  const command = `
    $OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::new()
    Get-WinGetPackage ${args} | ConvertTo-Json
  `
  const { stdout } = await execa('powershell', ['-Command', command])
  await setAppStorage(stdout)
  return JSON.parse(stdout, reviver)
}