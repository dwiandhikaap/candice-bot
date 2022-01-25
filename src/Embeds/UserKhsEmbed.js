const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { parseKhs } = require("../util/Parser");

function UserKhsEmbed(param) {
    const { user, buttonIdTag, userKhsData, isOddSemester, tahunAkademik } = param;
    const { IpkSem, JmlSks } = userKhsData;
    const khsparsed = parseKhs(userKhsData);

    const embed = new MessageEmbed()
        .setThumbnail(user.displayAvatarURL())
        .setTitle(`Info KHS ▸ _**${user.username}**_`)
        .setColor("#4278f5")
        .addFields(
            { name: ":medal: Index Prestasi", value: `▸ **${IpkSem.toFixed(2)}** / 4.00`, inline: true },
            { name: ":books: Jumlah SKS", value: `▸ **${JmlSks}** SKS`, inline: true }
        )
        .addField("\u200B", khsparsed)
        .setFooter(`${tahunAkademik} - Semester ${isOddSemester ? "Ganjil" : "Genap"}`)
        .setTimestamp(new Date());

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
exports.UserKhsEmbed = UserKhsEmbed;
