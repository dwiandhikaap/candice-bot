const { CommandInteraction } = require("discord.js");
const { MhsEmbed } = require("../util/CommandEmbed");
const { botConfig } = require("../DatabaseHandler/ConfigHandler");
const { sortMhs } = require("../util/Util");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function mhs(interaction) {
    const mhsData = botConfig.mahasiswa;
    const sortedMhsData = sortMhs(mhsData);
    const mhsEmbed = MhsEmbed(sortedMhsData);
    interaction.reply(mhsEmbed);
}

module.exports = {
    mhs: mhs,
};
