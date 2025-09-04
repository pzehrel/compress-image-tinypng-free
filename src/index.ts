import { defineCompressor } from 'unplugin-compress-image/define'
import UA from 'user-agents'

interface Config {
  /**
   * @default 'https://tinypng.com/backend/opt/shrink'
   */
  uploadUrl?: string
}

export function tinypngWeb(config?: Config): ReturnType<typeof defineCompressor<'tinypng_web'>> {
  const { uploadUrl = 'https://tinypng.com/backend/opt/shrink' } = config || {}

  return defineCompressor('tinypng_web', {
    use: /png|jpe?g|webp|avif$/,

    compress: async (file) => {
      const headers = new Headers({ 'X-Forwarded-For': randomIpv4(), 'User-Agent': randomUA() })

      const uploader = await fetch(uploadUrl, {
        method: 'POST',
        headers,
        body: file,
      })

      if (uploader.status >= 400) {
        throw new Error(`Upload failed with status ${uploader.status}`)
      }

      const data = await uploader.json() as UploadResult

      const response = await fetch(data.output.url, {
        method: 'GET',
        headers: new Headers({
          ...headers,
          'Content-Type': 'application/octet-stream',
        }),
      })

      if (response.status >= 400) {
        throw new Error(`Download failed with status ${response.status}`)
      }

      return response.arrayBuffer()
    },

  })
}

export default tinypngWeb

interface UploadResult {
  input: {
    size: number
    type: string
  }
  output: {
    size: number
    type: string
    width: number
    height: number
    ratio: number
    url: string
  }
}

function randomIpv4(): string {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.')
}
function randomUA(): string {
  return new UA().toString()
}
