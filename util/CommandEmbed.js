const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const { parseMakul, parseKhs } = require("./Util")

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

function UserNotFound(){
  return {embeds : [{
    "color": "#4278f5",
    "description": `No account found. Register via \`/reg [NIM] [Password]\``
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
          {name: "Status", value: `${IsAktif ? ':white_check_mark:   Aktif' : ':negative_squared_cross_mark: \u2007 Tidak Aktif'}`, inline: true}
        )
        .setFooter(`${user.username} ▸ ${TahunAkademik} - Semester ${Semester == 1 ? "Ganjil" : "Genap"}`)
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

function UserKhsEmbed(param){
  const { user, buttonIdTag, userKhsData, isOddSemester, tahunAkademik} = param;
  const { IpkSem, JmlSks } = userKhsData;
  const khsparsed = parseKhs(userKhsData);

  const embed = new MessageEmbed()
        .setThumbnail(user.displayAvatarURL())
        .setTitle(`Info KHS ▸ _**${user.username}**_`)
        .setColor("#4278f5")
        .setFooter(`${tahunAkademik} - Semester ${isOddSemester ? "Ganjil" : "Genap"}`)
        .setTimestamp(new Date())
        .addFields(
          {name: ':medal: Index Prestasi', value: `▸ **${IpkSem.toFixed(2)}** / 4.00`, inline:true},
          {name: 'Jumlah SKS', value: `▸ **${JmlSks}** SKS`, inline:true}
        )
        .addField('\u200B', khsparsed);
        
        
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

module.exports = {
    CommandInfoEmbed : CommandInfoEmbed,
    NotifEmbed : NotifEmbed,
    UserNotFound : UserNotFound,
    InvalidAcademicYear : InvalidAcademicYear,

    UserProfileEmbed : UserProfileEmbed,
    UserMakulEmbed : UserMakulEmbed,
    UserKhsEmbed : UserKhsEmbed
}