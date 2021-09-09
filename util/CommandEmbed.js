const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const { parseMakul, parseKhs, parseTranskrip } = require("./Util")

function CommandInfoEmbed(param){
    return {embeds : [{
            "title": param.title,
            "color": "#4278f5",
            "description": `${param.desc} \n\n**How to use**\n\`${param.syntax}\`\n\n**Example**\n\`${param.example}\``
          }]}
}

function NotifEmbed(param){
    return {embeds : [{
            "title": param.title,
            "color": "#4278f5",
            "description": `${param.desc}`
          }]}
}

function InvalidAcademicYear(){
    return {embeds : [{
      "color": "#4278f5",
      "description": `Invalid academic year!. Valid example : \`2020/2021\``
    }]}
}

function InvalidToken(){
  return {embeds : [{
    "color": "#4278f5",
    "description": `Invalid token!. Valid example : \`abC12\``
  }]}
}

function UserNotFound(){
  return {embeds : [{
    "color": "#4278f5",
    "description": `No account found. Register via \`/register [NIM] [Password]\``
  }]}
}

function AuthFailed(){
  return {embeds : [{
    "color": "#4278f5",
    "description": "Authentication failed! Please do `/register` with your correct username and password!"
  }]}
}

function PresensiEmbed(isSuccess){
  return {embeds : [{
    "color": "#4278f5",
    "description": isSuccess ? "Presensi Sukses ✅" : "Presensi Gagal ❌",
    "timestamp": new Date()
  }]}
}

function UserProfileEmbed(commandData){
  const {user, mhsData} = commandData;
  const {Nama, Npm, Prodi, Angkatan, IsAktif} = mhsData.Mhs
  const {TahunAkademik, Semester} = mhsData.PeriodeAkademik

  const embed = new MessageEmbed()
        .setThumbnail(user.displayAvatarURL())
        .setTitle(`Profile ▸ _**${user.username}**_`)
        .setColor("#4278f5")
        .setDescription(`
            Nama : **${Nama}**
            NIM : **${Npm}**
        `)
        .addFields(
          {name: "Program Studi", value: `▸ ${Prodi}`, inline: true},
          {name: "Angkatan", value: `▸ ${Angkatan}`, inline: true},
          {name: "Status", value: `${IsAktif ? '✅   Aktif' : '❌   Tidak Aktif'}`, inline: true}
        )
        .setFooter(`${TahunAkademik} - Semester ${Semester == 1 ? "Ganjil" : "Genap"}`)
        .setTimestamp(new Date());

  return {embeds : [embed]}
}

function UserMakulEmbed(param){
  const {user, buttonIdTag, userMakulData, isOddSemester, tahunAkademik} = param;
  const makulparsed = parseMakul(userMakulData);

  const embed = new MessageEmbed()
        .setThumbnail(user.displayAvatarURL())
        .setTitle(`Mata Kuliah ▸ _**${user.username}**_`)
        .setColor("#4278f5")
        .setDescription(makulparsed)
        .setTimestamp(new Date())
        .setFooter(`${tahunAkademik} - Semester ${isOddSemester ? "Ganjil" : "Genap"}`);

  const buttonRow = new MessageActionRow().addComponents(
      new MessageButton()
          .setStyle(isOddSemester ? 3 : 2)
          .setLabel('Ganjil')
          .setCustomId('oddBtn'+buttonIdTag)
          .setDisabled(isOddSemester),

      new MessageButton()
          .setStyle(isOddSemester? 2 : 3)
          .setLabel('Genap')
          .setCustomId('evenBtn'+buttonIdTag)
          .setDisabled(!isOddSemester)
  )
    
  return {embeds : [embed], components: [buttonRow]}
}

function UserKhsEmbed(param){
  const { user, buttonIdTag, userKhsData, isOddSemester, tahunAkademik} = param;
  const { IpkSem, JmlSks } = userKhsData;
  const khsparsed = parseKhs(userKhsData);

  const embed = new MessageEmbed()
        .setThumbnail(user.displayAvatarURL())
        .setTitle(`Info KHS ▸ _**${user.username}**_`)
        .setColor("#4278f5")
        .addFields(
          {name: ':medal: Index Prestasi', value: `▸ **${IpkSem.toFixed(2)}** / 4.00`, inline:true},
          {name: ':books: Jumlah SKS', value: `▸ **${JmlSks}** SKS`, inline:true}
          )
          .addField('\u200B', khsparsed)
          .setFooter(`${tahunAkademik} - Semester ${isOddSemester ? "Ganjil" : "Genap"}`)
          .setTimestamp(new Date());
        
        
  const buttonRow = new MessageActionRow().addComponents(
      new MessageButton()
          .setStyle(isOddSemester ? 3 : 2)
          .setLabel('Ganjil')
          .setCustomId('oddBtn'+buttonIdTag)
          .setDisabled(isOddSemester),

      new MessageButton()
          .setStyle(isOddSemester? 2 : 3)
          .setLabel('Genap')
          .setCustomId('evenBtn'+buttonIdTag)
          .setDisabled(!isOddSemester)
  )
    
  return {embeds : [embed], components: [buttonRow]}
}

function UserTranskripEmbed(param){
  const { user, buttonIdTag, transkripData, currentPage, pages, indexRange } = param;
  const transkripParsed = parseTranskrip(transkripData, indexRange);
  const { Ipk, JmlSks, SksWajib, SksKonsentrasi, SksPilihan } = transkripData;

  const embed = new MessageEmbed()
        .setThumbnail(user.displayAvatarURL())
        .setTitle(`Info Transkrip ▸ _**${user.username}**_`)
        .setColor("#4278f5")
        .addFields(
          {name: ':medal: IPK', value: `▸ **${Ipk.toFixed(2)}** / 4.00`, inline:true},
          {name: ':books: Jumlah SKS', value: `▸ **${JmlSks}** SKS`, inline:true},
          {name: '\u200B', value: '\u200B', inline:true},
          {name: ':green_book: SKS Wajib', value: `▸ **${SksWajib}** SKS`, inline:true},
          {name: ':orange_book: SKS Konsentrasi', value: `▸ **${SksKonsentrasi}** SKS`, inline:true},
          {name: ':bookmark: SKS Pilihan', value: `▸ **${SksPilihan}** SKS`, inline:true}
          )
          .addField('\u200B', transkripParsed)
          .setFooter(`Page ${currentPage}/${pages}`)
          .setTimestamp(new Date());
        
        
  const buttonRow = new MessageActionRow().addComponents(
      new MessageButton()
          .setStyle(1)
          .setLabel('Prev. Page')
          .setCustomId('prevBtn'+buttonIdTag)
          .setDisabled(currentPage == 1),

      new MessageButton()
          .setStyle(1)
          .setLabel('Next Page')
          .setCustomId('nextBtn'+buttonIdTag)
          .setDisabled(currentPage == pages)
  )
    
  return {embeds : [embed], components: [buttonRow]}
}

function InfoEmbed(nodeJsVersion, discordJsVersion, botVersion, uptime, clientAvatarUrl){
  const embed = new MessageEmbed()
        .setThumbnail(clientAvatarUrl)
        .setColor("#4278f5")
        .addFields({
          "name": `About Candice`,
          "value": `[candice](https://gitfront.io/r/user-6093614/0784dcf390539e7ac2345a1e5ece5fed49904d8c/candice-bot/) is a Discord Bot that was built to allow users to access AMIKOM One features without having to own an Android device. This project is currently a private repository maintained by [siveroo](https://github.com/siveroo).`
        },
        {
          "name": `Bot Version`,
          "value": botVersion,
          "inline": true
        },
        {
          "name": `Node.js Version`,
          "value": nodeJsVersion,
          "inline": true
        },
        {
          "name": `Discord.js Version`,
          "value": discordJsVersion,
          "inline": true
        },
        {
          "name": `Uptime`,
          "value": uptime
        }
        )
        .setFooter(`made by siveroo`, 'https://avatars.githubusercontent.com/u/53227252?v=4')

  return {embeds : [embed]}
}

module.exports = {
    CommandInfoEmbed : CommandInfoEmbed,
    NotifEmbed : NotifEmbed,
    UserNotFound : UserNotFound,
    AuthFailed : AuthFailed,
    InvalidAcademicYear : InvalidAcademicYear,
    InvalidToken : InvalidToken,
    
    InfoEmbed : InfoEmbed,
    PresensiEmbed : PresensiEmbed,
    UserProfileEmbed : UserProfileEmbed,
    UserMakulEmbed : UserMakulEmbed,
    UserKhsEmbed : UserKhsEmbed,
    UserTranskripEmbed : UserTranskripEmbed
}