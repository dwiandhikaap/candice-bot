const { dbGetData } = require("../DatabaseHandler/UserAuthHandler");
const { isInvalidYear } = require("../util/Util");
const { getMakul } = require("../util/RequestHandler");
const { UserMakulEmbed } = require("../Embeds/UserMakulEmbed");
const { UserNotFound } = require("../Embeds/UserNotFound");
const { InvalidAcademicYear } = require("../Embeds/InvalidAcademicYear");
const { AuthFailed } = require("../Embeds/AuthFailed");

/**
 * @param {CommandInteraction} interaction User command
 */
async function makul(interaction) {
    const user = interaction.user;
    const date = new Date();
    const userData = await dbGetData(user.id);
    const isOddSemester = true;
    const tahunAkademik = interaction.options.getString("tahunakademik", true);
    const buttonIdTag = date.getSeconds().toString() + date.getMilliseconds().toString();

    let commandData = { interaction, user, userData, isOddSemester, tahunAkademik, buttonIdTag };

    if (userData == null) {
        await interaction.reply(UserNotFound());
        return;
    }

    try {
        commandData.userMakulData = await getMakulData(commandData);
    } catch (err) {
        await interaction.reply(AuthFailed());
        return;
    }

    if (isInvalidYear(tahunAkademik)) {
        await interaction.reply(InvalidAcademicYear());
        return;
    }

    await interaction.reply(UserMakulEmbed(commandData));

    commandData.filter = (btnInteraction) => {
        return (
            btnInteraction.user.id === user.id &&
            (btnInteraction.customId == "evenBtn" + buttonIdTag || btnInteraction.customId == "oddBtn" + buttonIdTag)
        );
    };

    interactionHandler(commandData);
}

async function interactionHandler(param) {
    const { interaction, filter, buttonIdTag } = param;
    const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 10000 });

    collector.on("collect", async (buttonInteraction) => {
        await buttonInteraction.deferUpdate();
    });

    collector.on("end", async (buttonInteraction) => {
        if (buttonInteraction.first() == undefined) {
            await interaction.editReply({ components: [] });
            return;
        }

        if (buttonInteraction.first().customId === "evenBtn" + buttonIdTag) {
            param.isOddSemester = false;
        } else if (buttonInteraction.first().customId === "oddBtn" + buttonIdTag) {
            param.isOddSemester = true;
        }

        param.userMakulData = await getMakulData(param);

        await interaction.editReply(UserMakulEmbed(param));
        interactionHandler(param);
    });
}

async function getMakulData(param) {
    const { userData, isOddSemester, tahunAkademik } = param;
    const { nim, password } = userData;
    const semester = isOddSemester ? 1 : 2;

    return getMakul(nim, password, semester, tahunAkademik);
}

module.exports = {
    makul: makul,
};
