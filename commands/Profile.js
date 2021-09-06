const { CommandInteraction } = require("discord.js");
const { UserNotFound, UserProfileEmbed, NotifEmbed } = require("../util/CommandEmbed");
const { dbGetData } = require("../util/DatabaseHandler");
const { getMhsData } = require("../util/RequestHandler");

/**
* @param {CommandInteraction} interaction User message
*/
async function profile(interaction){
    const user = interaction.user;
    const userid = user.id;
    const userData = await dbGetData(userid);

    const commandData = {user}

    if(userData == null){
        interaction.reply(UserNotFound());
        return;
    }

    try{
        commandData.mhsData = await getMhsData(userData.nim, userData.password);
    }catch(err){
        interaction.reply(NotifEmbed({
            desc: "Authentication failed! Please check your username and password!"
        }));
        return;
    }

    interaction.reply(UserProfileEmbed(commandData));
}

module.exports = {
    profile : profile
}
