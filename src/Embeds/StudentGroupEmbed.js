const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { parseMhsGroup } = require("../util/Parser");

function StudentGroupEmbed(mhsGroup, buttonIdTag, guildIconURL) {
    const parsedMhsGroup = parseMhsGroup(mhsGroup);
    const embed = new MessageEmbed()
        .setThumbnail(guildIconURL)
        .setColor("#4278f5")
        .setTitle("Random Group Generator ▸ **20 BCI 01**")
        .setDescription("Definitely fair and not rigged 😉")
        .setFooter("2021/2022 - Semester Ganjil")
        .setTimestamp(new Date())
        .addField("\u200B", parsedMhsGroup);

    const buttonRow = new MessageActionRow().addComponents(
        new MessageButton()
            .setStyle(2)
            .setLabel("🎲 Re-roll!")
            .setCustomId("rerollBtn" + buttonIdTag)
    );

    return { embeds: [embed], components: [buttonRow] };
}
exports.StudentGroupEmbed = StudentGroupEmbed;
