const { CommandInteraction } = require("discord.js");
const jsonFormat = require("json-format");
const { MhsEmbed } = require("../util/CommandEmbed");
const { dbFindConfig } = require("../util/DatabaseHandler/ConfigHandler");
const { sortMhs } = require("../util/Util");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function mhs(interaction) {
    const mhsData = (await dbFindConfig()).mahasiswa;
    const sortedMhsData = sortMhs(mhsData);
    const mhsEmbed = MhsEmbed(sortedMhsData);
    interaction.reply(mhsEmbed);
}

module.exports = {
    mhs: mhs,
};
