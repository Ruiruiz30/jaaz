import { buildApiUrl } from '@/utils/api'

export async function getConfigExists(): Promise<{ exists: boolean }> {
  const response = await fetch(buildApiUrl('/api/config/exists'))
  return await response.json()
}
