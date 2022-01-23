const { CommandInteraction } = require("discord.js");
const { updateConfig } = require("./DeveloperCommands/Config");
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

        case "config": {
            await updateConfig(interaction);
            break;
        }
    }
}

module.exports = {
    developerCommand: developerCommand,
};
