const { CommandInteraction } = require("discord.js");
const jsonFormat = require("json-format");
const { dbSetConfig, dbFindConfig } = require("../../util/DatabaseHandler/ConfigHandler");
const { dbIsUserDev } = require("../../util/DatabaseHandler/DeveloperAuthHandler");
const { isInvalidYear } = require("../../util/Util");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function updateConfig(interaction) {
    const user = interaction.user;
    const year = interaction.options.getString("year", false);
    const semester = interaction.options.getString("semester", false);
    const jadwal = interaction.options.getString("jadwal", false);

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

    if (jadwal) {
        try {
            const parsedJadwal = JSON.parse(jadwal);
            config.jadwal = parsedJadwal;
        } catch (err) {
            interaction.reply("Invalid jadwal format! Use minified JSON!");
            return;
        }
    }

    if (Object.keys(config).length === 0) {
        const currentConfig = jsonFormat(await dbFindConfig());

        interaction.reply(`Current Config\n\`\`\`json\n${currentConfig}\`\`\``);
        return;
    }

    await dbSetConfig(config);
    interaction.reply(
        `Successfully updated the config! Affected config(s) : \n\`\`\`json\n${jsonFormat(config)}\`\`\``
    );
}

module.exports = {
    updateConfig: updateConfig,
};
