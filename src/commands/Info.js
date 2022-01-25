const { CommandInteraction, Client } = require("discord.js");
const discordJsPackage = require("discord.js/package.json");
const appPackage = require("../../package.json");
const { InfoEmbed } = require("../Embeds/InfoEmbed");
const { dbInfo } = require("../DatabaseHandler/MainDatabase");

/**
 * @param {CommandInteraction} interaction - User interaction
 * @param {Client} client - User interaction
 */
async function info(interaction, client) {
    const nodeJsVersion = process.version;
    const discordJsVersion = discordJsPackage.version;
    const mongoDBInfo = await dbInfo();
    mongoDBInfo.uptime = secondsToDhms(mongoDBInfo.uptime);

    const botInfo = {
        version: appPackage.version,
        uptime: secondsToDhms(process.uptime()),
    };
    const clientAvatarUrl = client.user.displayAvatarURL();

    const reply = InfoEmbed(nodeJsVersion, discordJsVersion, mongoDBInfo, botInfo, clientAvatarUrl);
    await interaction.reply(reply);
}

// i stole and then modified this code
function secondsToDhms(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    let timeDisplay = new Array(4);
    timeDisplay[0] = d > 0 ? d + (d == 1 ? " day" : " days") : "";
    timeDisplay[1] = h > 0 ? h + (h == 1 ? " hour" : " hours") : "";
    timeDisplay[2] = m > 0 ? m + (m == 1 ? " minute" : " minutes") : "";
    timeDisplay[3] = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

    let timeString = timeDisplay[3];
    for (let i = 0; i < 3; i++) {
        if (timeDisplay[i] != "") {
            timeString = timeDisplay[i] + ", " + timeDisplay[i + 1];
            break;
        }
    }
    return timeString;
}

module.exports = {
    info: info,
};
