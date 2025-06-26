import { describe, it } from "vitest";
import { search } from "../../../packages/cli/src/commands";

describe('Search Command', () => {

  it('test id args', async () => {
    await search('vscode',[{arg:'--id',query:'Microsoft.VisualStudioCode'}])
  },{
    timeout:100000
  })

})