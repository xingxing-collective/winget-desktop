import { execa } from "execa"
import { PackageFieldMatchOption } from "../../../types"
import { destr } from "destr"

type PackageUninstallMode = 'Default' | 'Silent' | 'Interactive'

type CommandParameters = ['-Force', unknown] | ['-Id', string] | ['-Log', string]
  | ['-MatchOption', PackageFieldMatchOption] | ['-Mode', PackageUninstallMode] | ['-Moniker', string]
  | ['-Name', string] | ['-PSCatalogPackage', unknown] | ['-Query', string[]] | ['-Source', string]
  | ['-Version', string] | ['-Confirm', unknown] | ['-WhatIf', unknown]

export type UninstallPackageArgs = CommandParameters[] | string

export type UninstallResult = {
  Id: string
  Name: string
  Source: string
  UninstallerErrorCode: number
  Status: string
  RebootRequired: boolean
  ExtendedErrorCode: {
    Message: unknown
    Data: unknown
    InnerException: unknown
    TargetSite: unknown
    StackTrace: unknown
    HelpLink: unknown
    Source: unknown
    HResult: unknown
  } | null
  CorrelationData: string
}

/**
 Uninstalls a WinGet Package.
 
 @description This command uninstalls a WinGet package from your computer. 
 The command includes parameters to specify values used to search for installed packages. 
 By default, all string-based searches are case-insensitive substring searches. 
 Wildcards are not supported. You can change the search behavior using the MatchOption parameter.
 @param { UninstallPackageArgs } cwdArgs
 @returns `Microsoft.WinGet.Client.Engine.PSObjects.PSUninstallResult`
 https://www.powershellgallery.com/packages/Microsoft.WinGet.Client/1.9.2505/Content/Format.ps1xml
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
export const uninstall = async (cwdArgs: UninstallPackageArgs): Promise<UninstallResult> => {
  const args = Array.isArray(cwdArgs) ? cwdArgs?.map(x => x.join(' ') || '')?.join(' ') || '' : cwdArgs

  const command = `
    $OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::new()
    Uninstall-WinGetPackage ${args} | ConvertTo-Json -Depth 5
  `
  const { stdout } = await execa('powershell', ['-Command', command])
  return destr(stdout)
}