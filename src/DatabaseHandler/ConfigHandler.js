const { bot_db } = require("./MainDatabase");

const configCollection = bot_db.collection("config");

class BotConfig {
    constructor() {}

    get(key) {
        return this.config[key];
    }

    set(key, value) {
        this.updateConfig({ [key]: value });
    }

    async init() {
        this.config = await configCollection.findOne();
    }

    async fetch() {
        return await configCollection.findOne();
    }

    async updateConfig(config) {
        for (let key in config) {
            if (config.hasOwnProperty(key)) {
                this.config[key] = config[key];
            }
        }

        if (this.fetch()) {
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
}

const botConfig = new BotConfig();

module.exports = {
    botConfig: botConfig,
};
