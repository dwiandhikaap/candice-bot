const { CommandInteraction } = require("discord.js");
const { botConfig } = require("../../DatabaseHandler/ConfigHandler");
const { AmogusEmbed } = require("../../Embeds/AmogusEmbed");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function devSusPanel(interaction) {
    const user = interaction.user;

    if (!(await dbIsUserDev(user.id))) {
        interaction.reply("You're not the developer!");
        return;
    }

    const buttonIdTag = new Date().getTime().toString();
    const currentStatus = botConfig.get("sus");
    const embed = AmogusEmbed(currentStatus, buttonIdTag);

    const filter = (btnInteraction) => {
        return btnInteraction.user.id === user.id && btnInteraction.customId == "toggleSusButton" + buttonIdTag;
    };

    const commandData = { interaction, buttonIdTag, currentStatus, filter };
    interaction.reply(embed);
    interactionHandler(commandData);
}

async function interactionHandler(param) {
    const { interaction, buttonIdTag, currentStatus, filter } = param;

    const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 30000 });

    collector.on("collect", async (buttonInteraction) => {
        await buttonInteraction.deferUpdate();
    });

    collector.on("end", async (buttonInteraction) => {
        // Clear components if no one pressed the button until it's time out
        if (buttonInteraction.first() == undefined) {
            await interaction.editReply({ components: [] });
            return;
        }

        if (buttonInteraction.first().customId == "toggleSusButton" + buttonIdTag) {
            param.currentStatus = !currentStatus;
            botConfig.set("sus", !currentStatus);

            const embed = AmogusEmbed(!currentStatus, buttonIdTag);

            await interaction.editReply(embed);
            interactionHandler(param);
        }
    });
}

module.exports = {
    devSusPanel: devSusPanel,
};
