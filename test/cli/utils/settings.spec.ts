import { describe, it } from "vitest";
import { initSettings } from "../../../packages/cli/src";

describe('Init Settings', () => {
  
  it('generate winget desktop settings', async () => {
    await initSettings()
  })

})