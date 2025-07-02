import { execa } from 'execa'
import { PackageFieldMatchOption } from "../../../types"

type CommandParameters = ['-Command', string] | ['-Count', number] | ['-Id', string]
  | ['-MatchOption', PackageFieldMatchOption] | ['-Moniker', string] | ['-Name', string]
  | ['-Query', string[]] | ['-Source', string] | ['-Tag', string]

export type FindPackageArgs = CommandParameters[] | string

export type FoundCatalogPackage = {
  Name: string
  Id: string
  Version: string
  Source: string
}[]

/**
 Searches for packages from configured sources.
 
 @description Searches for packages from configured sources.
 @param { FindPackageArgs } cwdArgs
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
export const find = async (cwdArgs: FindPackageArgs): Promise<FoundCatalogPackage> => {
  const args = Array.isArray(cwdArgs) ? cwdArgs?.map(x => x.join(' ') || '')?.join(' ') || '' : cwdArgs

  const command = `
    $OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::new()
    Find-WinGetPackage ${args} | ConvertTo-Json
  `
  const { stdout } = await execa('powershell', ['-Command', command])
  return JSON.parse(stdout)
}