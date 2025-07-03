import { describe, expect, it } from "vitest";
import { install } from "../../../packages/cli/src";

describe('Install-WinGetPackage', () => {

  it('Install a package using a query', async () => {
    const result = await install('Microsoft.PowerShell')
    expect(result).toMatchSnapshot()
  }, Infinity)

  it('Install a package by Id', async () => {
    const result = await install([['-Id', 'Microsoft.PowerShell']])
    expect(result).toMatchSnapshot()
  }, Infinity)

  it('Install a package by Name', async () => {
    const result = await install([['-Name', 'PowerToys']])
    expect(result).toMatchSnapshot()
  }, Infinity)

  it('Install a specific version of a package', async () => {
    const result = await install([['Microsoft.PowerShell'], ['-Version', '7.4.4.0']])
    expect(result).toMatchSnapshot()
  }, Infinity)

})