import { describe, expect, it } from "vitest";
import { get } from "../../../packages/cli/src";

describe('Get-WinGetPackage', () => {
  it('Default example', async () => {
    const apps = await get()
    expect(apps).toMatchSnapshot()
  }, Infinity)

  it('Get package by Id', async () => {
    const app = await get([['-Id', 'Microsoft.PowerShell']])
    expect(app).toMatchSnapshot()
  }, Infinity)

  it('Get package(s) by name', async () => {
    const app = await get([['-Name', 'PowerShell']])
    expect(app).toMatchSnapshot()
  }, Infinity)

})