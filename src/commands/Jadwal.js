const { CommandInteraction } = require("discord.js");
const { JadwalEmbed } = require("../Embeds/JadwalEmbed");
const { botConfig } = require("../DatabaseHandler/ConfigHandler");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function jadwal(interaction) {
    // TODO: use proper userConcentration on the next semester (semester 4)
    const userConcentration = "all";
    const semester = botConfig.currentSemester;
    const jadwalData = botConfig.jadwal;

    interaction.reply(JadwalEmbed(jadwalData, semester, userConcentration));
}

module.exports = {
    jadwal: jadwal,
};
