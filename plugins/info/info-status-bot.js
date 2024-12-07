exports.default = {
   names: ['Info', 'Main'],
   tags: ['infobot', 'statusbot'],
   command: ['infobot', 'statusbot'],
   start: async (m, {
      conn
   }) => {
      const y = 'Aktif ✅', t = 'Tidak Aktif ❎';
      let caption = `*${zw} STATUS BOT 🤖*\n*${setting.botName}*\n\n`
      caption += `Self: ${global.self ? y : t}\n`
      caption += `Auto Download: ${global.autodl ? y : t}\n`
      caption += `Auto Backup DB: ${global.auto_backup ? y : t}\n`
      caption += `Auto Status Bio: ${db.settings.autobio ? y : t}\n`
      caption += `Auto Read Story: ${db.settings.readsw ? y : t}\n`      
      caption += `Group Mode: ${global.group_mode ? y : t}\n`
      caption += `Mess Group Only: ${global.group_only_message ? y : t}\n`
      caption += `AdReply: ${global.adReply ? y : t}\n`
      caption += `Use Limit Message: ${global.use_limit_message ? y : t}\n`
      caption += `Limit AdReply: ${global.limit_adReply ? y : t}\n`
      caption += `Read Group: ${global.read_group ? y : t}\n`
      caption += `Read Private: ${global.read_private ? y : t}\n`
      caption += `Typing Group: ${global.typing_group ? y : t}\n`
      caption += `Typing Private: ${global.typing_private ? y : t}\n`
      caption += `Recording Group: ${global.recording_group ? y : t}\n`
      caption += `Recording Private: ${global.recording_private ? y : t}\n`
      caption += `Ram Set: ${setting.ram}\n`
      caption += `Prefix: ${db.settings.prefix}\n\n`
      caption += `Untuk mengubah pengaturan langsung dari bot owner bisa cek di menu .set`      
      conn.reply(m.chat, caption, m)
   }
}