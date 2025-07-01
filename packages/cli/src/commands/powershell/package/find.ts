import { execa } from 'execa'

type Keys = '-Command' | '-Count' | '-Id' | '-MatchOption' | '-Moniker' | '-Name' | '-Query' | '-Source' | '-Tag'
type CwdArgs = [Keys, string | number | string[]][] | string

/**
 Searches for packages from configured sources.
 
 @description Searches for packages from configured sources.
 @param { CwdArgs } cwdArgs
 @returns `Microsoft.WinGet.Client.Engine.PSObjects.PSFoundCatalogPackage`
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
export const find = async (cwdArgs: CwdArgs) => {
  const args = Array.isArray(cwdArgs) ? cwdArgs?.map(x => x.join(' ') || '')?.join(' ') || '' : cwdArgs

  const command = `
    $OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::new()
    Find-WinGetPackage ${args} | ConvertTo-Json
  `
  const { stdout } = await execa('powershell', ['-Command', command])
  return stdout
}