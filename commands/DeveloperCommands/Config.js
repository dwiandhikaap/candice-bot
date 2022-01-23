const { CommandInteraction } = require("discord.js");
const { dbSetConfig } = require("../../util/DatabaseHandler/ConfigHandler");
const { dbIsUserDev } = require("../../util/DatabaseHandler/DeveloperAuthHandler");
const { isInvalidYear } = require("../../util/Util");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function updateConfig(interaction) {
    const user = interaction.user;
    const year = interaction.options.getString("year", false);
    const semester = interaction.options.getString("semester", false);

    if (!(await dbIsUserDev(user.id))) {
        interaction.reply("You're not the developer!");
        return;
    }

    const config = {};

    if (year) {
        if (isInvalidYear(year)) {
            interaction.reply("Invalid academic year!");
            return;
        }
        config.currentYear = year;
    }

    if (semester) {
        if (isNaN(parseInt(semester))) {
            interaction.reply("Invalid semester!");
            return;
        }
        config.currentSemester = parseInt(semester);
    }

    if (Object.keys(config).length === 0) {
        interaction.reply("No config was passed, nothing changed!");
        return;
    }

    await dbSetConfig(config);
    interaction.reply(
        `Successfully updated the config! Affected config(s) : \n\`\`\`json\n${JSON.stringify(config)}\`\`\``
    );
}

module.exports = {
    updateConfig: updateConfig,
};
