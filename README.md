# compress-image-tinypng-web

A compressor for [unplugin-compress-image](https://github.com/pzehrel/unplugin-compress-image). Uses the TinyPNG official website API. File size will be limited to under 5MB.

[![npm version](https://img.shields.io/npm/v/compress-image-tinypng-web?style=flat-square)](https://www.npmjs.com/package/compress-image-tinypng-web)
[![npm downloads](https://img.shields.io/npm/dm/compress-image-tinypng-web?style=flat-square)](https://www.npmjs.com/package/compress-image-tinypng-web)
[![license](https://img.shields.io/npm/l/compress-image-tinypng-web?style=flat-square)](https://www.npmjs.com/package/compress-image-tinypng-web)

## Usage

```bash
pnpm add -D compress-image-tinypng-web unplugin-compress-image
```

```ts
import CompressImage from 'unplugin-compress-image'
import CompressImageTinypngWeb from 'compress-image-tinypng-web'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [
    CompressImage({
      compressors: [ CompressImageTinypngWeb() ],
      // optional
      jsquash: false,
      tinypng: false,
    })
  ]
})
```
