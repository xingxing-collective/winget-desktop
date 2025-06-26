import { execa } from 'execa'
import { existsSync } from 'node:fs'
import { getAppStorage } from '../../utils'
import { appsPath } from '../../../../build/src'

export const ls = async () => {
  if (existsSync(appsPath)) {
    return getAppStorage()
  }
  const command = `
    Get-WmiObject -Class Win32_Product | ConvertTo-Json -Depth 2 | Out-File -FilePath "${appsPath}" -Encoding utf8
  `

  await execa('powershell', ['-Command', command])

  return getAppStorage()
}