const { CommandInteraction } = require("discord.js");
const { Permissions } = require("discord.js");
const { NotifEmbed } = require("../util/CommandEmbed");
const { dbTogglePresensiChannel } = require("../util/DatabasePresensi");

/**
* @param {CommandInteraction} interaction - User interaction
*/
async function togglePresensiChannel(interaction){
    const user = interaction.member;
    const channelId = interaction.channelId;

    if(!user.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
        console.log(user.permissions.toArray());
        await interaction.reply(NotifEmbed({
            title: "Access denied",
            desc: "ADMINISTRATOR permission is required!"
        }))
        return;
    }

    const toggleChannel = await dbTogglePresensiChannel(channelId);

    await interaction.reply(NotifEmbed({
        title: "Presensi Channel",
        desc: `Channel <#${channelId}> is now ${toggleChannel == 1 ? 'enabled' : 'disabled'} for presensi use!`
    }))
    return;
}

module.exports = {
    togglePresensiChannel : togglePresensiChannel
}
