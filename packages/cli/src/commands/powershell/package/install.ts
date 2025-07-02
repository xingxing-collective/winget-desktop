import { execa } from "execa"
import { PackageFieldMatchOption } from "../../../types"
import { destr } from "destr"

type PackageInstallerType = 'Default' | 'Inno' | 'Wix' | 'Msi' | 'Nullsoft' | 'Zip' | 'Msix' | 'Exe' | 'Burn' | 'MSStore' | 'Portable'
type PackageInstallMode = 'Default' | 'Silent' | 'Interactive'
type PackageInstallScope = 'Any' | 'User' | 'System' | 'UserOrUnknown' | 'SystemOrUnknown'

type CommandParameters = ['-AllowHashMismatch', unknown] | ['-Architecture', unknown] | ['-Custom', string] | ['-Force', unknown]
  | ['-Header', string] | ['-Id', string] | ['-InstallerType', PackageInstallerType] | ['-Locale', string] | ['-Location', string]
  | ['-Log', string] | ['-MatchOption', PackageFieldMatchOption] | ['-Mode', PackageInstallMode] | ['-Moniker', string] | ['-Name', string]
  | ['-Override', string] | ['-PSCatalogPackage', unknown] | ['-Query', string[]] | ['-Scope', PackageInstallScope] | ['-SkipDependencies', unknown]
  | ['-Source', string] | ['-Version', string] | ['-Confirm' | '--cf', unknown] | ['-WhatIf' | '--wf', unknown]

export type InstallPackageArgs = CommandParameters[] | string

export type InstallResult = {
  Id: string
  Name: string
  Source: string
  InstallerErrorCode: number
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
 Installs a WinGet Package.
 
 @description This command installs a WinGet package from a configured source. 
 The command includes parameters to specify values used to search for packages in the configured sources. 
 By default, the command searches all sources. 
 By default, all string-based searches are case-insensitive substring searches. Wildcards are not supported. 
 You can change the search behavior using the MatchOption parameter.
 @param { InstallPackageArgs } cwdArgs
 @returns `Microsoft.WinGet.Client.Engine.PSObjects.PSInstallResult`
 https://www.powershellgallery.com/packages/Microsoft.WinGet.Client/1.9.2505/Content/Format.ps1xml
 @example <caption>Install a package using a query</caption> 

 ``` powershell
  Install-WinGetPackage Microsoft.PowerShell
 ```

 @example <caption>Install a package by Id</caption> 

 ``` powershell
  Install-WinGetPackage -Id Microsoft.PowerShell
 ```

 @example <caption>Install a package by Name</caption> 

 ``` powershell
  Install-WinGetPackage -Name "PowerToys (Preview)"
 ```

 @example <caption>Install a specific version of a package</caption> 

 ``` powershell
  Install-WinGetPackage Microsoft.PowerShell -Version 7.4.4.0
 ```

 */
export const install = async (cwdArgs: InstallPackageArgs): Promise<InstallResult> => {
  const args = Array.isArray(cwdArgs) ? cwdArgs?.map(x => x.join(' ') || '')?.join(' ') || '' : cwdArgs

  const command = `
    $OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::new()
    Install-WinGetPackage ${args} | ConvertTo-Json -Depth 5
  `
  const subprocess = execa('powershell', ['-Command', command])
  try {
    const { stdout } = await subprocess
    return destr(stdout)
  } catch (error) {
    throw error
  } finally {
    subprocess.kill()
  }

}