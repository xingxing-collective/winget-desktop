import { describe, it } from "vitest";
import { get } from "../../../packages/cli/src";

describe('Test Get WinGetPackage', () => {
  it('Get-WinGetPackage', async () => {
    await get()
  },200000)

  it('Get-WinGetPackage set Id arg', async () => {
    await get([['-Id', 'Microsoft.PowerShell']])
  },100000)

})