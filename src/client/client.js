const Discord = require("discord.js");

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
    partials: ["CHANNEL"],
});
exports.client = client;
