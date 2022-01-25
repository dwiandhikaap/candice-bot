const { CommandInteraction } = require("discord.js");
const { MhsEmbed } = require("../Embeds/MhsEmbed");
const { botConfig } = require("../DatabaseHandler/ConfigHandler");
const { sortMhs } = require("../util/Util");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function mhs(interaction) {
    const guildIconURL = interaction.guild.iconURL();
    const mhsData = botConfig.mahasiswa;
    const sortedMhsData = sortMhs(mhsData);
    const mhsEmbed = MhsEmbed(sortedMhsData, guildIconURL);
    interaction.reply(mhsEmbed);
}

module.exports = {
    mhs: mhs,
};
