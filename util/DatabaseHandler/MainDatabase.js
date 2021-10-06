const { MongoClient } = require("mongodb");
const uri = process.env.DB_URI;
        
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = client.db("user_db");

async function dbInit(){
    await client.connect();
}

async function dbClose(){
    await client.close();
}

async function dbInfo(){
    const {version, uptime} = await db.admin().serverStatus();
    return {version, uptime};
}

module.exports = {
    db : db,

    dbInit : dbInit,
    dbClose : dbClose,
    dbInfo : dbInfo
}