const { CommandInteraction } = require("discord.js");
const jsonFormat = require("json-format");
const { StudentGroupEmbed } = require("../util/CommandEmbed");
const { dbFindConfig } = require("../util/DatabaseHandler/ConfigHandler");
const { shuffleMhsGroup } = require("../util/Util");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function group(interaction) {
    const isByStudent = interaction.options.getBoolean("student");
    const count = interaction.options.getInteger("count");
    const mhsData = (await dbFindConfig()).mahasiswa;

    const group = shuffleMhsGroup(mhsData, isByStudent, count);

    const groupEmbed = StudentGroupEmbed(group);

    interaction.reply(groupEmbed);
}

module.exports = {
    group: group,
};
