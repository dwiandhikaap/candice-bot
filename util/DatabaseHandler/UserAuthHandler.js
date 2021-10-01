const { encrypt, hashUserId, decrypt } = require("../Encryption");
const { db } = require("./MainDatabase");

var credentials = db.collection("credential");

async function dbGetData(userid){
    const key = hashUserId(userid,process.env.KEYSALT);
    const id = hashUserId(userid,process.env.IDSALT);
    const userData = await credentials.findOne({"userid" : id});

    if(userData){
        userData.nim = decrypt(key, userData.nim);
        userData.password = decrypt(key, userData.password);
    };

    return userData;
}

async function dbSearch(id){
    const user = await dbGetData(id);
    if(user){
        return true;
    }
    else{
        return false;
    }
}

async function dbInsert(id, nim, password){
    const key = hashUserId(id,process.env.KEYSALT);
    await credentials.insertOne({
        "userid" : hashUserId(id,process.env.IDSALT),
        "nim" : encrypt(key,nim),
        "password" : encrypt(key,password)
    });
}

async function dbUpdate(userid, nim, password){
    const key = hashUserId(userid,process.env.KEYSALT);
    const id = hashUserId(userid,process.env.IDSALT);
    await credentials.replaceOne({"userid" : id} ,{
        "userid" : id,
        "nim" : encrypt(key,nim),
        "password" : encrypt(key,password)
    });
}

async function dbDelete(id){
    // Just in case there are duplicates, so people don't sue me
    await credentials.deleteMany({
        "userid" : hashUserId(id,process.env.IDSALT)
    });
}

module.exports = {
    dbGetData : dbGetData,
    dbSearch : dbSearch,
    dbInsert : dbInsert,
    dbUpdate : dbUpdate,
    dbDelete : dbDelete,
}
