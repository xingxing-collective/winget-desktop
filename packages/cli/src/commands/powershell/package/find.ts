import { execa } from 'execa'
import { reviver } from '../../../utils'

export type FindPackageParameters = '-Command' | '-Count' | '-Id' | '-MatchOption' | '-Moniker' | '-Name' | '-Query' | '-Source' | '-Tag'
export type FindPackageCwdArgs = [FindPackageParameters, string | number | string[]][] | string

export type FoundCatalogPackage = {
  name: string
  id: string
  version: string
  source: string
}[]

/**
 Searches for packages from configured sources.
 
 @description Searches for packages from configured sources.
 @param { FindPackageCwdArgs } cwdArgs
 @returns `Microsoft.WinGet.Client.Engine.PSObjects.PSFoundCatalogPackage`
 https://www.powershellgallery.com/packages/Microsoft.WinGet.Client/1.9.2505/Content/Format.ps1xml
 @example <caption>Search for PowerShell</caption> 

 ``` powershell
  Find-WinGetPackage PowerShell
 ```

 @example <caption>Search for Microsoft.PowerShell by id</caption> 

 ``` powershell
  Find-WinGetPackage -Id Microsoft.PowerShell
 ```
 
 @example <caption>Search for Microsoft.PowerShell by exact id</caption> 

 ``` powershell
  Find-WinGetPackage -Id Microsoft.PowerShell -MatchOption Equals
 ```

 */
export const find = async (cwdArgs: FindPackageCwdArgs): Promise<FoundCatalogPackage> => {
  const args = Array.isArray(cwdArgs) ? cwdArgs?.map(x => x.join(' ') || '')?.join(' ') || '' : cwdArgs

  const command = `
    $OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::new()
    Find-WinGetPackage ${args} | ConvertTo-Json
  `
  const { stdout } = await execa('powershell', ['-Command', command])
  return JSON.parse(stdout, reviver)
}