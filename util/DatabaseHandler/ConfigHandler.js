const { bot_db } = require("./MainDatabase");

const configCollection = bot_db.collection("config");

async function dbSetConfig(config) {
    if (await dbFindConfig()) {
        configCollection.findOneAndUpdate(
            {},
            {
                $set: config,
            }
        );
        return;
    }

    configCollection.insertOne(config);
}

async function dbFindConfig() {
    const config = await configCollection.findOne();

    return config;
}

module.exports = {
    dbSetConfig: dbSetConfig,
};
