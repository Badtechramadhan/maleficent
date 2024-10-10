const fetch = require('node-fetch');
module.exports = async (update, conn, opts, image) => {
   const { Welcome, Bye, Number } = opts
   const musicBye = "https://qu.ax/AHUTz.mp3"
   const musicWelcome = "https://qu.ax/cJKt.mp3"
   if (update.action == 'remove') {
      conn.adReply(update.id, Bye, image, null, {
         mentions: [Number],
         manyForward: true
      })
      conn.sendFile(update.id, musicBye, {
         ptt: true,
         contextInfo: {
            mentionedJid: [Number],
            externalAdReply: {
               title: `Bye 👋 ${Number.split('@')[0]}`,
               mediaType: 1,
               showAdAttribution: false,
               thumbnailUrl: image,
               thumbnail: await (await fetch(image)).buffer(),
               sourceUrl: setting.group.link
            }
         }
      })
   } else if (update.action == 'add') {
      conn.adReply(update.id, Welcome, image, null, {
         mentions: [Number],
         manyForward: true
      })
      conn.sendFile(update.id, musicWelcome, {
         ptt: true,
         contextInfo: {
            mentionedJid: [Number],
            externalAdReply: {
               title: `Welcome 👋 ${Number.split('@')[0]}`,
               mediaType: 1,
               showAdAttribution: false,
               thumbnailUrl: image,
               thumbnail: await (await fetch(image)).buffer(),
               sourceUrl: setting.group.link
            }
         }
      })
   }
}