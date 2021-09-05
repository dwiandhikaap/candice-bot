const { CommandInteraction } = require("discord.js");
const { UserNotFound, UserProfile, NotifEmbed } = require("../util/CommandEmbed");
const { dbGetData } = require("../util/DatabaseHandler");
const { getMhsData } = require("../util/RequestHandler");

/**
* @param {CommandInteraction} interaction User message
*/
async function profile(interaction){
    const sender = interaction.user;
    const userid = sender.id;

    const userData = await dbGetData(userid);

    if(userData == null){
        interaction.reply(UserNotFound());
        return;
    }

    try{
        var mhsData = await getMhsData(userData.nim, userData.password);
    }catch(err){
        interaction.reply(NotifEmbed({
            desc: "Authentication failed! Please check your username and password!"
        }));
        return;
    }

    interaction.reply(UserProfile(mhsData));
}

module.exports = {
    profile : profile
}
