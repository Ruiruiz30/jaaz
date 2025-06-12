/**
 * 获取API基础URL
 * 在开发环境中使用代理，在生产环境中使用完整的API URL
 */
export function getApiUrl(): string {
  // 在开发环境中，使用相对路径让Vite代理处理
  if (import.meta.env.DEV) {
    return ''
  }
  
  // 在生产环境中，使用环境变量或默认的API URL
  return import.meta.env.VITE_API_URL || 'https://jaazapi.zeabur.app'
}

/**
 * 构建完整的API端点URL
 */
export function buildApiUrl(endpoint: string): string {
  const baseUrl = getApiUrl()
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${baseUrl}${cleanEndpoint}`
}

/**
 * 获取WebSocket URL
 */
export function getWebSocketUrl(path: string = '/ws'): string {
  const baseUrl = getApiUrl()
  
  if (import.meta.env.DEV) {
    // 开发环境使用相对路径
    return `ws://localhost:5174${path}`
  }
  
  // 生产环境使用完整URL，将https替换为wss
  const wsUrl = baseUrl.replace('https://', 'wss://').replace('http://', 'ws://')
  return `${wsUrl}${path}`
} 