const { CommandInteraction } = require("discord.js");
const jsonFormat = require("json-format");
const { MhsEmbed } = require("../util/CommandEmbed");
const { dbFindConfig } = require("../util/DatabaseHandler/ConfigHandler");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function mhs(interaction) {
    const mhsData = (await dbFindConfig()).mahasiswa;

    const mhsEmbed = MhsEmbed(mhsData);
    interaction.reply(mhsEmbed);
}

module.exports = {
    mhs: mhs,
};
