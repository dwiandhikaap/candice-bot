const { CommandInteraction } = require("discord.js");
const { NotifEmbed } = require("../Embeds/NotifEmbed");

/**
 * @param {CommandInteraction} interaction User message
 */
async function help(interaction) {
    await interaction.reply(
        NotifEmbed({
            title: "Commands",
            desc: "Use commands below to learn more\n\
               `/info` `/help` `/register` `/unreg` `/profile`\n\
               `/khs` `/jadwal` `/makul` `/transkrip` `/presensi` \n\
               `/togglepresensichannel` `/mhs` `/group`\
        ",
        })
    );
}

module.exports = {
    help: help,
};
