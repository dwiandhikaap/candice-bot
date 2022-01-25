const { MessageEmbed } = require("discord.js");
const { client } = require("../client/client");

function InfoEmbed(nodeJsVersion, discordJsVersion, mongoDBInfo, botInfo) {
    const clientAvatarUrl = client.user.avatarURL();
    const embed = new MessageEmbed()
        .setThumbnail(clientAvatarUrl)
        .setColor("#4278f5")
        .addFields(
            {
                name: `📝 About Candice`,
                value: `[candice](https://gitfront.io/r/user-6093614/0784dcf390539e7ac2345a1e5ece5fed49904d8c/candice-bot/) is a Discord Bot that was built to allow users to access AMIKOM One features without having to own an Android device. This project is currently a private repository maintained by [siveroo](https://github.com/siveroo).`,
            },
            {
                name: `🤖 Bot Info`,
                value: `Version: ${botInfo.version}\nUptime: ${botInfo.uptime}`,
                inline: true,
            },
            {
                name: `<:nodejs:893466618217238539> Node.js Version`,
                value: nodeJsVersion,
                inline: true,
            },
            {
                name: `<:discordjs:893466628703010876> Discord.js Version`,
                value: discordJsVersion,
                inline: true,
            },
            {
                name: `<:mongodb:895298927459442808> MongoDB Server Info`,
                value: `Version: ${mongoDBInfo.version}\nUptime: ${mongoDBInfo.uptime}\n`,
                inline: true,
            }
        )
        .setFooter(`Made by siveroo`, "https://avatars.githubusercontent.com/u/53227252?v=4");

    return { embeds: [embed] };
}
exports.InfoEmbed = InfoEmbed;
