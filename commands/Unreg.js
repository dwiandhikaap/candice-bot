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
        try {
            await dbDelete(userid);
            await interaction.reply(NotifEmbed({
                desc: `Successfully unregistered \`${username}\`'s account!`
            }))
        } catch (error) {
            await interaction.reply(NotifEmbed({
                desc: `Failed to unregister \`${username}\`'s account!\nSeems like our database has problems.`
            }))
        }
    }
    else{
        await interaction.reply(UserNotFound());
    }
}

module.exports = {
    unreg : unreg
}