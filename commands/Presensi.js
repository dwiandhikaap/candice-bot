const { UserNotFound, InvalidToken, PresensiEmbed, AuthFailed, CommandInfoEmbed } = require("../util/CommandEmbed");
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
        await interaction.reply(UserNotFound());
        return;
    }

    try{
        await authUser(userData.nim, userData.password);
    }catch(err){
        await interaction.reply(AuthFailed());
        return;
    } 
    
    if(isInvalidToken(token)){
        await interaction.reply(InvalidToken());
        return;
    }
    
    const payload = generatePresensiPayload(userData.nim, token, process.env.SECRET_MESSAGE, process.env.SECRET_KEY);

    let isSuccess = false;
    try{
        await sendPresensi(userData, payload);
        isSuccess = true;
    }catch(err){
        const user = interaction.user;
        console.log(user.username, err.response.data);
    }
    
    try{
        await interaction.reply(PresensiEmbed(isSuccess));
    }catch(err){
        const user = interaction.user;
        console.log(user.username, err);
    }
}

module.exports = {
    presensi : presensi
}
