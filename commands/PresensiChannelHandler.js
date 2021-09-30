const { Message } = require("discord.js");
const { AuthFailed } = require("../util/CommandEmbed");
const { dbGetData } = require("../util/DatabaseHandler");
const { dbRetrievePresensiChannels } = require("../util/DatabasePresensi");
const { generatePresensiPayload } = require("../util/PresensiPayload");
const { authUser, sendPresensi } = require("../util/RequestHandler");
const { isInvalidToken } = require("../util/Util");

let cachedChannelIds = []

/**
* @param {Message} message
*/
async function messageHandler(message) {
    if(message.author.bot){
        return;
    }

    const channelId = message.channelId;

    if(!cachedChannelIds.includes(channelId)){
        cachedChannelIds = await dbRetrievePresensiChannels();
    }

    if(!cachedChannelIds.includes(channelId)){
        return;
    }

    const id = message.author.id
    const username = message.author.username;
    const msgContent = message.content;
    const userData = await dbGetData(id);

    if(userData == null){
        return;
    }

    if(isInvalidToken(msgContent)){
        await message.react("❌");
        return;
    }

    try{
        await authUser(userData.nim, userData.password);
    }catch(err){
        await message.reply(AuthFailed());
        return;
    } 
    
    const payload = generatePresensiPayload(userData.nim, msgContent, process.env.SECRET_MESSAGE, process.env.SECRET_KEY);

    let isSuccess = false;
    try{
        await sendPresensi(userData, payload);
        isSuccess = true;
    }catch(err){
        console.log(username, err.response.data);
    }

    await message.react(`${isSuccess ? '✅' : '❌'}`);
}

module.exports = {
    messageHandler: messageHandler
}