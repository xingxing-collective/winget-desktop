import { execa } from "execa"


type Keys = '-Force' | '-Id' | '-Log' | '-MatchOption' | '-Mode' | '-Moniker' | '-Name'
  | '-PSCatalogPackage' | '-Query' | '-Source' | '-Version' | '-Confirm' | '-WhatIf' | '-Tag'
type CwdArgs = [Keys, string | number | string[]][] | string

/**
 Uninstalls a WinGet Package.
 
 @description This command uninstalls a WinGet package from your computer. 
 The command includes parameters to specify values used to search for installed packages. 
 By default, all string-based searches are case-insensitive substring searches. 
 Wildcards are not supported. You can change the search behavior using the MatchOption parameter.
 @param {CwdArgs} cwdArgs
 @returns `Microsoft.WinGet.Client.Engine.PSObjects.PSUninstallResult`
 @example <caption>Uninstall a package using a query</caption> 

 ``` powershell
  Uninstall-WinGetPackage Microsoft.PowerShell
 ```

 @example <caption>Uninstall a package by Id</caption> 

 ``` powershell
  Uninstall-WinGetPackage -Id Microsoft.PowerShell
 ```

 @example <caption>Uninstall a package by Name</caption> 

 ``` powershell
  Uninstall-WinGetPackage -Name "PowerToys (Preview)"
 ```

 @example <caption>Uninstall a specific version of a package</caption> 

 ``` powershell
  Uninstall-WinGetPackage Microsoft.PowerShell -Version 7.4.4.0
 ```

 */
export const uninstall = async (cwdArgs: CwdArgs) => {
  const args = Array.isArray(cwdArgs) ? cwdArgs?.map(x => x.join(' ') || '')?.join(' ') || '' : cwdArgs

  const command = `
    $OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::new()
    Uninstall-WinGetPackage ${args} | ConvertTo-Json
  `
  const { stdout } = await execa('powershell', ['-Command', command])
  return stdout
}