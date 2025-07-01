import { getVersion } from "../packages/cli/src"

async function main() {
  const stdout = await getVersion()
  console.log(stdout)
}
main()