const { CommandInteraction } = require("discord.js");
const { NotifEmbed, UserNotFound } = require("../util/CommandEmbed");
const { dbSearch, dbDelete } = require("../util/DatabaseHandler");

/**
* @param {CommandInteraction} interaction User message
*/
async function unreg(interaction){
    const sender = interaction.user;
    const username = sender.username;
    const userid = sender.id;

    const isRegistered = await dbSearch(userid);

    if(isRegistered){
        await dbDelete(userid);
        interaction.reply(NotifEmbed({
            desc: `Successfully unregistered \`${username}\`'s account!`
        }))
    }
    else{
        interaction.reply(UserNotFound());
    }
}

module.exports = {
    unreg : unreg
}