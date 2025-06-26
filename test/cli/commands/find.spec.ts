import { describe, it } from "vitest";
import { find } from "../../../packages/cli/src/commands";

describe('Find WinGetPackage', () => {

  it('Test Find WinGetPackage set app name', async () => {
    await find('vscode')
  },100000)

})