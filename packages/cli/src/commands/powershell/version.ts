import { execa } from "execa"

/**
 Gets the installed version of WinGet.
 
 @description Gets the installed version of WinGet.
 @returns `System.String`
 @example <caption>Default example</caption> 

 ``` powershell
  Get-WinGetVersion
 ```

 */
export const getVersion = async () => {
  const command = `
    $OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::new()
    Get-WinGetVersion | ConvertTo-Json
  `
  const { stdout } = await execa('powershell', ['-Command', command])
  return stdout
}