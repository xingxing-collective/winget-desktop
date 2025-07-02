import { install, uninstall } from "../packages/cli/src/commands/powershell"

async function main() {
  const stdout = await uninstall([['-Id','CharlesMilette.TranslucentTB']])
  console.log(stdout)
}
main()