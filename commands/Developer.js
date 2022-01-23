const { CommandInteraction } = require("discord.js");
const { devLogin } = require("./DeveloperCommands/Login");
const { devLogout } = require("./DeveloperCommands/Logout");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function developerCommand(interaction) {
    switch (interaction.options.getSubcommand()) {
        case "login": {
            await devLogin(interaction);
            break;
        }

        case "logout": {
            await devLogout(interaction);
            break;
        }
    }
}

module.exports = {
    developerCommand: developerCommand,
};