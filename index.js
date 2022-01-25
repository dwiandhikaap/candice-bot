require("dotenv").config();
require("./src/util/Commands");

const Discord = require("discord.js");
const { createCommands, interactionHandler } = require("./src/util/Commands");
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
    partials: ["CHANNEL"],
});
const { dbInit } = require("./src/DatabaseHandler/MainDatabase");
const { dbLoadChannel } = require("./src/DatabaseHandler/PresensiChannelHandler");
const { messageHandler } = require("./src/commands/PresensiChannelHandler");
const { botConfig } = require("./src/DatabaseHandler/ConfigHandler");

async function clientStart() {
    await dbInit();
    await botConfig.init();
    await dbLoadChannel();
    await client.login(process.env.CLIENT_TOKEN);

    //client.user.setAvatar('./avatar.jpg');
    client.user.setPresence({
        activities: [{ name: "⛔ Under construction!" }],
        status: "dnd",
    });
}

client.on("ready", async () => {
    console.log(`candice logged in as ${client.user.tag}!`);

    // todo last : deprecate guilds command, make it global in release - siveroo 9/2/2021
    // nevermind, it's a private use bot anyway :shrug:
    const guilds = client.guilds.cache.map((guild) => guild);

    await createCommands(guilds);
});

client.on("messageCreate", async (message) => {
    await messageHandler(message);
});

client.on("interactionCreate", async (interaction) => {
    await interactionHandler(interaction, client);
});

clientStart();
