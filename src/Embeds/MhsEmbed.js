const { MessageEmbed } = require("discord.js");
const { parseMhs } = require("../util/Parser");

function MhsEmbed(mhsData, guildIconURL) {
    const parsedMhs = parseMhs(mhsData);
    const embed = new MessageEmbed()
        .setThumbnail(guildIconURL)
        .setColor("#4278f5")
        .setTitle("Mahasiswa ▸ **20 BCI 01**")
        .setDescription("Daftar mahasiswa di kelas 20 BCI 01")
        .setFooter("2021/2022 - Semester Ganjil")
        .setTimestamp(new Date())
        .addField("\u200B", parsedMhs);

    return { embeds: [embed] };
}
exports.MhsEmbed = MhsEmbed;
