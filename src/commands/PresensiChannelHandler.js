const { Message } = require("discord.js");
const { AuthFailed } = require("../Embeds/AuthFailed");
const { dbGetData } = require("../DatabaseHandler/UserAuthHandler");
const { dbRetrievePresensiChannels } = require("../DatabaseHandler/PresensiChannelHandler");
const { generatePresensiPayload } = require("../util/PresensiPayload");
const { authUser, sendPresensi } = require("../util/RequestHandler");
const { isInvalidToken } = require("../util/Util");

let cachedChannelIds = []

/**
* @param {Message} message
*/
async function messageHandler(message) {
    const author = message.author;
    const id = author.id
    const username = author.username;
    const msgContent = message.content;
    const channelId = message.channelId;

    if(author.bot || isInvalidToken(msgContent)){
        return;
    }

    if(!cachedChannelIds.includes(channelId)){
        cachedChannelIds = await dbRetrievePresensiChannels();
    }

    if(!cachedChannelIds.includes(channelId)){
        return;
    }

    const userData = await dbGetData(id);

    if(userData == null){
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