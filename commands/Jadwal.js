const { CommandInteraction } = require("discord.js");
const { JadwalEmbed } = require("../util/CommandEmbed");
const jadwalData = require("../res/jadwal.json");

/**
* @param {CommandInteraction} interaction - User interaction
*/
async function jadwal(interaction){
    interaction.reply(JadwalEmbed(jadwalData));
}

module.exports = {
    jadwal : jadwal
}
