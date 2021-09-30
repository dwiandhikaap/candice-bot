const { db } = require("./DatabaseHandler");

const channelCollection = db.collection("presensiChannels");

let presensiChannels = [];

async function dbLoadChannel(){
    await dbRetrievePresensiChannels();

    console.log("Loaded Channels : ", presensiChannels);
}

async function dbRetrievePresensiChannels(){
    if(presensiChannels.length == 0){
        const channels = await channelCollection.find().map(doc => doc.channelId).toArray();
        presensiChannels = channels;
    }
    
    return presensiChannels;
}

async function dbAddPresensiChannel(channelId){
    if(presensiChannels.includes(channelId)){
        return;
    }

    await channelCollection.insertOne({
        channelId: channelId
    });

    presensiChannels.push(channelId);
}

async function dbDeletePresensiChannel(channelId){
    await channelCollection.findOneAndDelete({
        channelId: channelId
    });

    const findIndex = presensiChannels.indexOf(channelId);

    if(findIndex == -1){
        return;
    }

    presensiChannels.splice(findIndex, 1);
}

async function dbTogglePresensiChannel(channelId){
    if(presensiChannels.includes(channelId)){
        await dbDeletePresensiChannel(channelId);
        return -1;
    }

    await dbAddPresensiChannel(channelId);
    return 1;
}

module.exports = {
    dbLoadChannel : dbLoadChannel,
    dbRetrievePresensiChannels : dbRetrievePresensiChannels,
    dbTogglePresensiChannel : dbTogglePresensiChannel
}