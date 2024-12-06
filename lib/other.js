const fs = require('fs'), general = require('utils-mf');
const cron = require('node-cron');
global.Format = general.Format;
global.Connect = general.Connect;
global.mess = general.mess_JSON;
global.setting = general.setting_JSON;
global.namebot = setting.botName;
global.wm = `By ${setting.footer}`
global.footer = setting.footer;
global.cover = setting.thumbnail;
global.loading = pickRandom([mess.wait, 'Sabakh...', 'Tunggu Sebentar...', 'Hold On...', 'Tahan...']);
global.ed = [" █▒▒▒▒▒▒▒▒▒10%", " ██▒▒▒▒▒▒▒▒20%", " ███▒▒▒▒▒▒▒30%", " ████▒▒▒▒▒▒45%", " █████▒▒▒▒▒50%", " ███████▒▒▒75%", " █████████▒95%", " ██████████100%", " ██████████100%"]
/**
 * m.edReply("lasttext", delay)
 * example m.edReply("Done!", 500)
 **/
global.java = '⭔'
global.javi = '⬣'
global.star = '✨'
global.zw = 'ㄊ'
global.logo_premium = 'Ⓟ'
global.logo_limit = 'Ⓛ'
global.gcbot_short = 'http://surl.li/qgkhyu'
global.hyd_gcbot = ['Join group', gcbot_short] 
//link_group bisa kalian ganti link group kalian sendiri kalo punya, atau bisa link chanel juga kalo punya, atau bisa di isi dengan link lain , kalo dari bot ketik .setlink 
global.link_group = 'https://chat.whatsapp.com/E4k9NwxYyOaDQkNu8hF8nb'
global.group_welcome = '*Selamat Datang 🐷*\n*%user* \n*Di %subject*\n*Kenalan dulu yuk*\n*Nama:*\n*Umur:*\n*Asal Kota:*\n*Hoby:*\n*Merek HP:*\n'
global.group_bye = 'Bye 🐽\n%user \nHas Left From %subject Group'
//adReply is message with photo (cover)
global.adReply = true
//untuk owner limit akan tetap di kenakan fitur .addlimit dan lainya biar ga lupa ajah cheat ajh .addlimit nomormu 999999
global.use_limit_message = true
global.limit_message = '🐽 %limit Limit Terpakai √'
//limit_adReply = send message limit with photo or cover 
global.limit_adReply = false

/**
 * auto_backup if u wanna use mongodb change configuration on lib/src/mongo/mongo-info.js
 * setting langsung dari bot ketik .set atau lihat di menunya ketik .menu owner cobain satu satu biar paham 🐽
*/
global.auto_backup = false
global.autodl = false
global.self = false
global.group_mode = false
/**
 * group_only_message is response message groupOnly when group mode is active in private chat.
 * true if wanna respond with groupOnly message
 * false if don't wanna respond message groupOnly in private chat ketik .set ada penjelasan nya atau lihat plugins/owner/owner-set.js",
 **/
global.group_only_message = false
global.read_group = true
global.read_private = true
global.typing_group = false
global.typing_private = false
global.recording_group = true
global.recording_private = true

//games i gonna minimize and move this to database as soon,  if you can just do it :)
global.caklontong = {}
global.caklontong_desk = {}
global.family100 = {}
global.kuismath = {}
global.siapakahaku = {}
global.susunkata = {}
global.tebakbendera = {}
global.tebakgambar = {}
global.tebakgame = {}
global.tekateki = {}
global.tebaktebakan = {}
global.tebakkata = {}
global.tebakkalimat = {}
global.tictactoe = {}
global.boom = {}
global.default_database = { 
   users: {},
   chats: {},
   settings: {}
}
const caller = (conn) => {
   conn.ws.on('CB:call', (update) => {
      const call = update.content[0].attrs['call-creator'];
      const text = 'Kamu Telah Melanggar Ketentuan\nDilarang Menelepon Bot'
      conn.sendMessage(call, { text: text }, { ...conn_bind }).then(() => {
         conn.updateBlockStatus(call, 'block');
      });
   });
};
exports.caller = caller;
const addLimitToUsers = (limitToAdd) => {
   const list = Object.entries(global.db.users);
   list.forEach(([user, data]) => {
      data.limit += limitToAdd;
   });
   const caption = `Berhasil Menambah Limit ${limitToAdd} ke setiap pengguna\n`;
   console.log(caption);
};
cron.schedule('0 23 * * *', () => {
   const limitToAdd = 20
   addLimitToUsers(limitToAdd);    
}, {
   timezone: "Asia/Jakarta"
});
fs.loadFileSync(require.resolve(__filename));
