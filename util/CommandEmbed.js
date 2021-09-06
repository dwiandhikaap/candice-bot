const { MessageEmbed, MessageButton, User, MessageActionRow } = require("discord.js")
const { ParseMakul, ParseKhs } = require("./Parser")

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

function UserNotFound(){
    return {embeds : [{
      "color": "#4278f5",
      "description": `No account found. Register via \`/reg [NIM] [Password]\``
    }]}
}

function UserProfile(mhsData){
  return {embeds : [{
    "title": "User Profile",
    "color": "#4278f5",
    "description": `
      Nama : ${mhsData.Mhs.Nama}
      NIM: ${mhsData.Mhs.Npm}
      Prodi: ${mhsData.Mhs.Prodi}
      Angkatan: ${mhsData.Mhs.Angkatan}
      Status: ${mhsData.Mhs.IsAktif ? ":white_check_mark: Aktif" : " :negative_squared_cross_mark: Tidak Aktif"}
    `,
    "timestamp" : new Date()
  }]}
}

function UserMakulEmbed(buttonIdTag, userMakulData, isOddSemester, tahunAkademik){
  const makulParsed = ParseMakul(userMakulData);

  const embed = new MessageEmbed()
        .setTitle('Mata Kuliah')
        .setColor("#4278f5")
        .setDescription(makulParsed)
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

function UserKhsEmbed(buttonIdTag, userKhsData, isOddSemester, tahunAkademik){
  const { IpkSem, JmlSks } = userKhsData;
  const khsParsed = ParseKhs(userKhsData);

  const embed = new MessageEmbed()
        
        .setTitle('Info KHS')
        .setColor("#4278f5")
        .setFooter(`${tahunAkademik} - Semester ${isOddSemester ? "Ganjil" : "Genap"}`)
        .setTimestamp(new Date())
        .addFields(
          {name: ':medal: Index Prestasi', value: `▸ **${IpkSem.toFixed(2)}** / 4.00`, inline:true},
          {name: 'Jumlah SKS', value: `▸ **${JmlSks}** SKS`, inline:true}
        )
        .addField('\u200B', khsParsed);
        
        

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
    UserProfile : UserProfile,
    UserMakulEmbed : UserMakulEmbed,
    UserKhsEmbed : UserKhsEmbed
}