const { CommandInteraction } = require("discord.js");
const { dbFindDevId, dbDeleteDevId } = require("../../DatabaseHandler/DeveloperAuthHandler");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function devLogout(interaction) {
    const user = interaction.user;
    const userId = user.id;

    if (await dbFindDevId(userId)) {
        await dbDeleteDevId(userId);

        interaction.reply(`Successfully removed ${user.username} from the developer list!`);
        return;
    } else {
        interaction.reply(`${user.username} is not a developer!`);
        return;
    }
}

module.exports = {
    devLogout: devLogout,
};
