const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

function AmogusEmbed(currentStatus, buttonIdTag) {
    const embed = new MessageEmbed()
        .setColor("#4278f5")
        .setTitle("Amongus Panel ▸ **ඞ**")
        .setDescription(`Is currently being an impostor : ${currentStatus ? "**TRUE**" : "FALSE"}`)
        .setFooter("2021/2022 - Semester Ganjil")
        .setTimestamp(new Date());

    const buttonRow = new MessageActionRow().addComponents(
        new MessageButton()
            .setStyle(currentStatus ? 3 : 4)
            .setLabel(currentStatus ? "Turn Off" : "Turn On")
            .setCustomId("toggleSusButton" + buttonIdTag)
    );

    return { embeds: [embed], components: [buttonRow] };
}
exports.AmogusEmbed = AmogusEmbed;
