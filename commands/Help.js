const { CommandInteraction } = require("discord.js");
const { NotifEmbed } = require("../util/CommandEmbed");

/**
* @param {CommandInteraction} interaction User message
*/
async function help(interaction){
    await interaction.reply(NotifEmbed({
        title: "Commands",
        desc: "Use commands below to learn more\n\
               `info` `help` `register` `unreg` `profile`\n\
               `khs` `makul` `transkrip` `presensi`\
        "
    }))
}

module.exports = {
    help : help
}
