import { describe, expect, it } from "vitest";
import { find } from "../../../packages/cli/src/commands";

describe('Find-WinGetPackage', () => {

  it('Search for PowerShell', async () => {
    const app = await find('PowerShell')
    expect(app).toMatchSnapshot()
  }, Infinity)

  it('Search for Microsoft.PowerShell by id', async () => {
    const app = await find([['-Id', 'Microsoft.PowerShell']])
    expect(app).toMatchSnapshot()
  }, Infinity)

  it('Search for Microsoft.PowerShell by exact id', async () => {
    const app = await find([['-Id', 'Microsoft.PowerShell'], ['-MatchOption', 'Equals']])
    expect(app).toMatchSnapshot()
  }, Infinity)

})