const { CommandInteraction } = require("discord.js");
const { JadwalEmbed } = require("../util/CommandEmbed");
const jadwalData = require("../res/jadwal.json");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function jadwal(interaction) {
    // TODO: use proper userConcentration on the next semester (semester 4)
    const userConcentration = "all";
    const semester = 3;

    interaction.reply(JadwalEmbed(jadwalData, semester, userConcentration));
}

module.exports = {
    jadwal: jadwal,
};
