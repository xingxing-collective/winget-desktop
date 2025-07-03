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
export const version = async () => {

  try {
    const command = `
      $OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::new()
      Get-WinGetVersion
    `
    const { stdout } = await execa('powershell', ['-Command', command])
    return stdout
  } catch (error: any) {
    throw new Error(error.message)
  }
}