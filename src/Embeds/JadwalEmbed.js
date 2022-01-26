const { MessageEmbed } = require("discord.js");
const { generateJadwalField } = require("../util/Util");

function JadwalEmbed(jadwalData) {
    const jadwalFields = generateJadwalField(jadwalData);
    const embed = new MessageEmbed()
        .setColor("#4278f5")
        .setTitle("Jadwal Kuliah ▸ **20 BCI 01**")
        .setFooter("2021/2022 - Semester Ganjil")
        .setTimestamp(new Date())
        .addFields(jadwalFields);

    return { embeds: [embed] };
}
exports.JadwalEmbed = JadwalEmbed;
