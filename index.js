require('dotenv').config();
require("./util/Commands");

const Discord = require('discord.js');
const { createCommands, interactionHandler } = require('./util/Commands');
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"]});
const { dbInit } = require('./util/DatabaseHandler');

async function dbStart() {
    await dbInit();
};

async function clientStart() {
    await client.login(process.env.CLIENT_TOKEN);

    //client.user.setAvatar('./avatar.jpg');
    client.user.setPresence({ activities: [{ name: 'with ur mom' }], status: 'online' });
}

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // todo last : deprecate guilds command, make it global in release - siveroo 9/2/2021
    const guilds = client.guilds.cache.map(guild => guild.id);

    await createCommands(guilds);
})

client.on('interactionCreate', async interaction => {
	await interactionHandler(interaction);
});


dbStart();
clientStart();

