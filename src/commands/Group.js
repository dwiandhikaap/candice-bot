const { CommandInteraction } = require("discord.js");
const { botConfig } = require("../DatabaseHandler/ConfigHandler");
const { StudentGroupEmbed } = require("../Embeds/StudentGroupEmbed");
const { shuffleMhsGroup } = require("../util/Util");

/**
 * @param {CommandInteraction} interaction - User interaction
 */
async function group(interaction) {
    const user = interaction.user;
    const isByStudent = interaction.options.getBoolean("student");
    const count = interaction.options.getInteger("count");
    const mhsData = botConfig.get("mahasiswa");
    const buttonIdTag = new Date().getTime().toString();
    const guildIconURL = interaction.guild.iconURL();

    const group = shuffleMhsGroup(mhsData, isByStudent, count);
    const groupEmbed = StudentGroupEmbed(group, buttonIdTag, guildIconURL);

    const filter = (btnInteraction) => {
        return btnInteraction.user.id === user.id && btnInteraction.customId == "rerollBtn" + buttonIdTag;
    };

    const commandData = { interaction, guildIconURL, mhsData, isByStudent, count, filter, buttonIdTag };

    interaction.reply(groupEmbed);
    interactionHandler(commandData);
}

async function interactionHandler(param) {
    const { interaction, guildIconURL, mhsData, isByStudent, count, filter, buttonIdTag } = param;

    const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 10000 });

    collector.on("collect", async (buttonInteraction) => {
        await buttonInteraction.deferUpdate();
    });

    collector.on("end", async (buttonInteraction) => {
        // Clear components if no one pressed the button until it's time out
        if (buttonInteraction.first() == undefined) {
            await interaction.editReply({ components: [] });
            return;
        }

        if (buttonInteraction.first().customId == "rerollBtn" + buttonIdTag) {
            const group = shuffleMhsGroup(mhsData, isByStudent, count);
            const groupEmbed = StudentGroupEmbed(group, buttonIdTag, guildIconURL);

            await interaction.editReply(groupEmbed);
            interactionHandler(param);
        }
    });
}

module.exports = {
    group: group,
};
