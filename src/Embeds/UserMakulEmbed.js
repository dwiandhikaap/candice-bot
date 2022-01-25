const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { parseMakul } = require("../util/Parser");

function UserMakulEmbed(param) {
    const { user, buttonIdTag, userMakulData, isOddSemester, tahunAkademik } = param;
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
            .setLabel("Ganjil")
            .setCustomId("oddBtn" + buttonIdTag)
            .setDisabled(isOddSemester),

        new MessageButton()
            .setStyle(isOddSemester ? 2 : 3)
            .setLabel("Genap")
            .setCustomId("evenBtn" + buttonIdTag)
            .setDisabled(!isOddSemester)
    );

    return { embeds: [embed], components: [buttonRow] };
}
exports.UserMakulEmbed = UserMakulEmbed;
