const { dbGetData } = require("../DatabaseHandler/UserAuthHandler");
const { NotifEmbed } = require("../Embeds/NotifEmbed");
const { UserNotFound } = require("../Embeds/UserNotFound");
const { UserProfileEmbed } = require("../Embeds/UserProfileEmbed");
const { getMhsData } = require("../util/RequestHandler");

/**
 * @param {CommandInteraction} interaction User message
 */
async function profile(interaction) {
    const user = interaction.user;
    const userid = user.id;
    const userData = await dbGetData(userid);

    const commandData = { user };

    if (userData == null) {
        await interaction.reply(UserNotFound());
        return;
    }

    try {
        commandData.mhsData = await getMhsData(userData.nim, userData.password);
    } catch (err) {
        await interaction.reply(
            NotifEmbed({
                desc: "Authentication failed! Please check your username and password!",
            })
        );
        return;
    }

    await interaction.reply(UserProfileEmbed(commandData));
}

module.exports = {
    profile: profile,
};
