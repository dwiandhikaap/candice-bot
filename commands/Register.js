const { CommandInteraction } = require("discord.js");
const { NotifEmbed, CommandInfoEmbed } = require("../util/CommandEmbed");
const { dbSearch, dbInsert, dbUpdate } = require("../util/DatabaseHandler");

/**
* @param {CommandInteraction} interaction User message
*/
 async function register(interaction){
    const sender = interaction.user;
    const username = sender.username;
    const userid = sender.id;
    const nim = interaction.options.getString("nim", true);
    const password = interaction.options.getString("password", true);;

    console.log(`User ${username} wants to register!`);
    
    const isUserFound = await dbSearch(userid);

    if(isUserFound){
        interaction.reply(NotifEmbed({
            desc : `Successfully updated \`${username}\`\'s account!`
        }))
        dbUpdate(userid, nim, password);
    }
    else{
        interaction.reply(NotifEmbed({
            desc : `Successfully linked \`${username}\`\'s account!`
        }))
        dbInsert(userid, nim, password);
    }
}

module.exports = {
    register : register
}