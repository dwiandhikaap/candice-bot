const { CommandInteraction } = require("discord.js");
const { UserNotFound, InvalidToken, PresensiEmbed, AuthFailed } = require("../util/CommandEmbed");
const { dbGetData } = require("../util/DatabaseHandler");
const { generatePresensiPayload } = require("../util/PresensiPayload");
const { sendPresensi, authUser } = require("../util/RequestHandler");
const { isInvalidToken } = require("../util/Util");

/**
* @param {CommandInteraction} interaction - User interaction
*/
async function presensi(interaction){
    const id = interaction.user.id;
    const token = interaction.options.getString('token', true);
    const userData = await dbGetData(id);

    
    if(userData == null){
        interaction.reply(UserNotFound());
        return;
    }

    try{
        await authUser(userData.nim, userData.password);
    }catch(err){
        interaction.reply(AuthFailed());
        return;
    } 
    
    if(isInvalidToken(token)){
        interaction.reply(InvalidToken());
        return;
    }
    
    const payload = generatePresensiPayload(userData.nim, token, process.env.SECRET_MESSAGE, process.env.SECRET_KEY);

    try{
        await sendPresensi(payload);
        interaction.reply(PresensiEmbed(true))
    }catch(err){
        interaction.reply(PresensiEmbed(false))
    }
    
    return;
}

module.exports = {
    presensi : presensi
}
