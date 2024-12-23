const fs = require('fs')
const ff = require('fluent-ffmpeg');
const webp = require("node-webpmux")
async function imageToWebp(media) {
   const tmpFileOut = `./tmp/${+ new Date}.webp`
   const tmpFileIn = `./tmp/${+ new Date}.jpg`
   fs.writeFileSync(tmpFileIn, media)
   await new Promise((resolve, reject) => {
      ff(tmpFileIn)
         .on("error", reject)
         .on("end", () => resolve(true))
         .addOutputOptions([
            "-vcodec",
            "libwebp",
            "-vf",
            "scale='min(250,iw)':min'(250,ih)':force_original_aspect_ratio=decrease,fps=15, pad=250:250:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
         ])
         .toFormat("webp")
         .save(tmpFileOut)
   })
   return fs.readFileSync(tmpFileOut);
}
async function videoToWebp(media) {
   const tmpFileOut = `./tmp/${+ new Date}.webp`
   const tmpFileIn = `./tmp/${+ new Date}.mp4`
   fs.writeFileSync(tmpFileIn, media)
   await new Promise((resolve, reject) => {
      ff(tmpFileIn)
         .on("error", reject)
         .on("end", () => resolve(true))
         .addOutputOptions([
            "-vcodec",
            "libwebp",
            "-vf",
            "scale='min(250,iw)':min'(250,ih)':force_original_aspect_ratio=decrease,fps=15, pad=250:250:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
            "-loop",
            "0",
            "-ss",
            "00:00:00",
            "-t",
            "00:00:05",
            "-preset",
            "default",
            "-an",
            "-vsync",
            "0"
         ])
         .toFormat("webp")
         .save(tmpFileOut)
   })
   return fs.readFileSync(tmpFileOut);
}

async function writeExifImg(media, metadata) {
   let wMedia = await imageToWebp(media)
   const tmpFileOut = `./tmp/${+ new Date}.webp`
   const tmpFileIn = `./tmp/${+ new Date}.webp`
   fs.writeFileSync(tmpFileIn, wMedia)
   if (metadata.packname || metadata.author) {
      const img = new webp.Image()
      const json = {
         "sticker-pack-id": `https://github.com/ruhend2001/maleficent`,
         "sticker-pack-name": metadata.packname,
         "sticker-pack-publisher": metadata.author,
         "emojis": metadata.categories ? metadata.categories : [""]
      }
      const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
      const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
      const exif = Buffer.concat([exifAttr, jsonBuff])
      exif.writeUIntLE(jsonBuff.length, 14, 4)
      await img.load(tmpFileIn)
      img.exif = exif
      await img.save(tmpFileOut)
      return tmpFileOut
   }
}
async function writeExifVid(media, metadata) {
   let wMedia = await videoToWebp(media)
   const tmpFileOut = `./tmp/${+ new Date}.webp`
   const tmpFileIn = `./tmp/${+ new Date}.webp`
   fs.writeFileSync(tmpFileIn, wMedia)
   if (metadata.packname || metadata.author) {
      const img = new webp.Image()
      const json = {
         "sticker-pack-id": `https://github.com/ruhend2001/maleficent`,
         "sticker-pack-name": metadata.packname,
         "sticker-pack-publisher": metadata.author,
         "emojis": metadata.categories ? metadata.categories : [""]
      }
      const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
      const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
      const exif = Buffer.concat([exifAttr, jsonBuff])
      exif.writeUIntLE(jsonBuff.length, 14, 4)
      await img.load(tmpFileIn)
      img.exif = exif
      await img.save(tmpFileOut)
      return tmpFileOut
   }
}
module.exports = {
   imageToWebp,
   videoToWebp,
   writeExifImg,
   writeExifVid
}