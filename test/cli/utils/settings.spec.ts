import { describe, it } from "vitest";
import { initSettings } from "../../../packages/cli/src";

describe('Settings', () => {
  
  it('generate winget desktop settings', async () => {
    await initSettings()
  })

})