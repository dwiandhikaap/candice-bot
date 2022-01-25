const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { parseTranskrip } = require("../util/Parser");

function UserTranskripEmbed(param) {
    const { user, buttonIdTag, transkripData, currentPage, pages, indexRange } = param;
    const transkripParsed = parseTranskrip(transkripData, indexRange);
    const { Ipk, JmlSks, SksWajib, SksKonsentrasi, SksPilihan } = transkripData;

    const embed = new MessageEmbed()
        .setThumbnail(user.displayAvatarURL())
        .setTitle(`Info Transkrip ▸ _**${user.username}**_`)
        .setColor("#4278f5")
        .addFields(
            { name: ":medal: IPK", value: `▸ **${Ipk.toFixed(2)}** / 4.00`, inline: true },
            { name: ":books: Jumlah SKS", value: `▸ **${JmlSks}** SKS`, inline: true },
            { name: "\u200B", value: "\u200B", inline: true },
            { name: ":green_book: SKS Wajib", value: `▸ **${SksWajib}** SKS`, inline: true },
            { name: ":orange_book: SKS Konsentrasi", value: `▸ **${SksKonsentrasi}** SKS`, inline: true },
            { name: ":bookmark: SKS Pilihan", value: `▸ **${SksPilihan}** SKS`, inline: true }
        )
        .addField("\u200B", transkripParsed)
        .setFooter(`Page ${currentPage}/${pages}`)
        .setTimestamp(new Date());

    const buttonRow = new MessageActionRow().addComponents(
        new MessageButton()
            .setStyle(1)
            .setLabel("Prev. Page")
            .setCustomId("prevBtn" + buttonIdTag)
            .setDisabled(currentPage == 1),

        new MessageButton()
            .setStyle(1)
            .setLabel("Next Page")
            .setCustomId("nextBtn" + buttonIdTag)
            .setDisabled(currentPage == pages)
    );

    return { embeds: [embed], components: [buttonRow] };
}
exports.UserTranskripEmbed = UserTranskripEmbed;
