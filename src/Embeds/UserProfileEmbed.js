const { MessageEmbed } = require("discord.js");

function UserProfileEmbed(commandData) {
    const { user, mhsData } = commandData;
    const { Nama, Npm, Prodi, Angkatan, IsAktif } = mhsData.Mhs;
    const { TahunAkademik, Semester } = mhsData.PeriodeAkademik;

    const embed = new MessageEmbed()
        .setThumbnail(user.displayAvatarURL())
        .setTitle(`Profile ▸ _**${user.username}**_`)
        .setColor("#4278f5")
        .setDescription(
            `
            Nama : **${Nama}**
            NIM : **${Npm}**
        `
        )
        .addFields(
            { name: "Program Studi", value: `▸ ${Prodi}`, inline: true },
            { name: "Angkatan", value: `▸ ${Angkatan}`, inline: true },
            { name: "Status", value: `${IsAktif ? "✅   Aktif" : "❌   Tidak Aktif"}`, inline: true }
        )
        .setFooter(`${TahunAkademik} - Semester ${Semester == 1 ? "Ganjil" : "Genap"}`)
        .setTimestamp(new Date());

    return { embeds: [embed] };
}
exports.UserProfileEmbed = UserProfileEmbed;
