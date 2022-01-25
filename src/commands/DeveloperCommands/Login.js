const { CommandInteraction } = require("discord.js");
const { dbFindDevId, dbAddDevId } = require("../../DatabaseHandler/DeveloperAuthHandler");
const { hash } = require("../../util/Encryption");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function devLogin(interaction) {
    const user = interaction.user;
    const userId = user.id;

    const password = interaction.options.getString("devpassword");
    const hashedPassword = hash(password, process.env.DEV_SALT);

    if (hashedPassword === process.env.DEV_HASH) {
        if (await dbFindDevId(userId)) {
            interaction.reply(`${user.username} is already a developer!`);
            return;
        }
        await dbAddDevId(userId);

        interaction.reply(`Successfully added ${user.username} as developer!`);
        return;
    }

    interaction.reply(`Incorrect password!`);
    return;
}

module.exports = {
    devLogin: devLogin,
};
