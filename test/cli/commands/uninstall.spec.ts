import { describe, expect, it } from "vitest";
import { uninstall } from "../../../packages/cli/src";

describe('Uninstall-WinGetPackage', () => {
  it('Uninstall a package using a query', async () => {
    const result = await uninstall('Microsoft.PowerShell')
    expect(result).toMatchSnapshot()
  }, Infinity)

  it('Uninstall a package by Id', async () => {
    const result = await uninstall([['-Id', 'Microsoft.PowerShell']])
    expect(result).toMatchSnapshot()
  }, Infinity)

  it('Uninstall a package by Name', async () => {
    const result = await uninstall([['-Name', 'PowerToys']])
    expect(result).toMatchSnapshot()
  }, Infinity)

  it('Uninstall a specific version of a package', async () => {
    const result = await uninstall([['Microsoft.PowerShell'], ['-Name', 'PowerToys']])
    expect(result).toMatchSnapshot()
  }, Infinity)

})