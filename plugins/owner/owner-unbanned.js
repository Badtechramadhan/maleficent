exports.default = {
   names: ['Owner'],
   tags: ['unbanned', 'unban'],
   command: ['unbanned', 'unban'],
   start: async (m, {
      text,
      prefix,
      command,
      User
   }) => {
      if (!text) return m.reply(`Masukkan Nomornya. Contoh: ${prefix+command} nomor\nContoh: ${prefix+command} 62xxxxx \n\nkamu bisa lihat di .listbanned\n\nterus salin nomornya lalu tempel`);
      let _user = `${text.replace("@", "")}`
      let user = `${_user}@s.whatsapp.net`
      User.addBannedUser(user, false);
      User.bannedReason(user, '');
      m.reply(`Nomor ${user} berhasil dihapus dari database banned\nSekarang Nomor Itu Bisa Menggunakan Bot Ini\nUntuk melihat daftar banned ketik .listbanned`);
   },
   owner: true
};
