const { CommandInteraction } = require("discord.js");
const { dbIsUserDev } = require("../../DatabaseHandler/DeveloperAuthHandler");
const { isInvalidYear } = require("../../util/Util");
const { Blob } = require("buffer");
const fs = require("fs");
const { botConfig } = require("../../DatabaseHandler/ConfigHandler");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function updateConfig(interaction) {
    const user = interaction.user;
    const year = interaction.options.getString("year", false);
    const semester = interaction.options.getString("semester", false);
    const jadwal = interaction.options.getString("jadwal", false);
    const mahasiswa = interaction.options.getString("mahasiswa", false);

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

    if (mahasiswa) {
        try {
            const parsedMahasiswa = JSON.parse(mahasiswa);
            config.mahasiswa = parsedMahasiswa;
        } catch (err) {
            interaction.reply("Invalid mahasiswa list format! Use minified JSON!");
            return;
        }
    }

    if (Object.keys(config).length === 0) {
        const fullConfig = botConfig.config;
        const jsn = JSON.stringify(fullConfig, null, 4);
        const buf = Buffer.from(jsn, "utf8");
        //interaction.send(buf)
        interaction.reply({ files: [{ attachment: buf, name: "config.json", description: "my nuts" }] });
        return;
    }

    botConfig.updateConfig(config);
    const formattedConfig = JSON.stringify(config, null, 4);

    interaction.reply(`Successfully updated the config! Affected config(s) : \n\`\`\`json\n${formattedConfig}\`\`\``, {
        split: true,
    });
}

module.exports = {
    updateConfig: updateConfig,
};
