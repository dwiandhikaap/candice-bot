const { CommandInteraction } = require("discord.js");
const { botConfig } = require("../DatabaseHandler/ConfigHandler");
const { JadwalEmbed } = require("../Embeds/JadwalEmbed");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function jadwal(interaction) {
    // TODO: use proper userConcentration on the next semester (semester 4)
    const userConcentration = "all";
    const semester = botConfig.get("currentSemester");
    const jadwalData = botConfig.get("jadwal");

    interaction.reply(JadwalEmbed(jadwalData, semester, userConcentration));
}

module.exports = {
    jadwal: jadwal,
};
