import { uninstall } from "../packages/cli/src/commands/powershell"

async function main() {
  const stdout = await uninstall([['-Id','Microsoft.PowerToys']])
  console.log(stdout)
}
main()