const { CommandInteraction } = require("discord.js");
const { dbIsUserDev } = require("../../DatabaseHandler/DeveloperAuthHandler");
const { isInvalidYear } = require("../../util/Validator");

const { botConfig } = require("../../DatabaseHandler/ConfigHandler");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function updateConfig(interaction) {
    const user = interaction.user;

    if (!(await dbIsUserDev(user.id))) {
        interaction.reply("You're not the developer!");
        return;
    }

    const key = interaction.options.getString("key");
    const value = interaction.options.getString("value");

    if (!value) {
        let outputJson =
            key === "all"
                ? JSON.stringify(botConfig.config, null, 4)
                : JSON.stringify({ [key]: botConfig.get(key) }, null, 4);

        if (outputJson.length < 1000) {
            interaction.reply(`\`\`\`json\n${outputJson}\`\`\``);
            return;
        }

        const buf = Buffer.from(outputJson, "utf8");
        interaction.reply({
            files: [{ attachment: buf, name: `config_${key}.json`, description: "Current bot configuration" }],
        });
        return;
    }

    switch (key) {
        case "all": {
            try {
                const parsedConfig = JSON.parse(value);
                botConfig.set("all", parsedConfig);
            } catch (error) {
                interaction.reply("Invalid jadwal format! Use minified JSON!");
                return;
            }
            break;
        }

        case "currentYear": {
            if (isInvalidYear(value)) {
                interaction.reply("Invalid academic year!");
                return;
            }
            botConfig.set("currentYear", value);
            break;
        }

        case "currentSemester": {
            if (isNaN(parseInt(value))) {
                interaction.reply("Invalid semester!");
                return;
            }
            botConfig.set("currentSemester", parseInt(value));
            break;
        }

        case "jadwal": {
            try {
                const parsedJadwal = JSON.parse(value);
                botConfig.set("jadwal", parsedJadwal);
            } catch (err) {
                interaction.reply("Invalid jadwal format! Use minified JSON!");
                return;
            }
            break;
        }

        case "mahasiswa": {
            try {
                const parsedMahasiswa = JSON.parse(value);
                botConfig.set("mahasiswa", parsedMahasiswa);
            } catch (err) {
                interaction.reply("Invalid mahasiswa list format! Use minified JSON!");
                return;
            }
            break;
        }
    }

    const affectedConfig = JSON.stringify({ [key]: value }, null, 4);

    if (affectedConfig.length < 1000) {
        interaction.reply(
            `Successfully updated the config! Affected config(s) : \n\`\`\`json\n${affectedConfig}\`\`\``,
            {
                split: true,
            }
        );
        return;
    }

    const buf = Buffer.from(affectedConfig, "utf8");
    interaction.reply({
        files: [
            { attachment: buf, name: `affected-config.json`, description: "Details of which config were affected" },
        ],
    });
}

module.exports = {
    updateConfig: updateConfig,
};
