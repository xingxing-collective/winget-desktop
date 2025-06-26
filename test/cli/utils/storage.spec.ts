import { describe, expect, it } from "vitest";
import { getStorage, removeStorage, setStorage } from "../../../packages/cli/src";
import { readFile, writeFile } from "fs/promises";

describe('Test Storage', () => {
  it('Get Storage', async () => {
    await writeFile('./get-storage.txt', 'Test Get Storage.')
    const res = await getStorage('./get-storage.txt')
    expect(res).toBe('Test Get Storage.')
  })

  it('Set Storage', async () => {
    await setStorage('./set-storage.txt', 'Test Set Storage.')
    const res = await readFile('./set-storage.txt', {
      encoding: 'utf8'
    })
    expect(res).toBe('Test Set Storage.')

  })

  it('Remove Storage', async () => {
    await setStorage('./remove-storage.txt', 'Test Remove Storage.')
    await removeStorage('./remove-storage.txt')
  })

})