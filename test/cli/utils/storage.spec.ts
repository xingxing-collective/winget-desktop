import { describe, it } from "vitest";
import { ls, setAppStorage } from "../../../packages/cli/src";

describe('Init Apps', () => {
  it('generate winget desktop apps storage', async () => {
    const stdout = await ls()
    await setAppStorage(stdout)
  }, {
    timeout: 200000
  })
})