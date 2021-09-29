const { UserNotFound, UserKhsEmbed, InvalidAcademicYear, AuthFailed } = require("../util/CommandEmbed");
const { dbGetData } = require("../util/DatabaseHandler");
const { isInvalidYear } = require("../util/Util");
const { getKhs } = require("../util/RequestHandler");

/**
* @param {CommandInteraction} interaction User command
*/
async function khs(interaction){
    const { user } = interaction;
    const date = new Date();
    const userData = await dbGetData(user.id);
    const isOddSemester = true;
    const tahunAkademik = interaction.options.getString("tahunakademik", true);
    const buttonIdTag = date.getSeconds().toString() + date.getMilliseconds().toString();

    let commandData = {interaction, user, date, userData, isOddSemester, tahunAkademik, buttonIdTag};

    if(userData == null){
        await interaction.reply(UserNotFound());
        return;
    }

    try{
        commandData.userKhsData = await getKhsData(commandData);
    }catch(err){
        await interaction.reply(AuthFailed());
        return;
    }  

    if(isInvalidYear(tahunAkademik)){
        await interaction.reply(InvalidAcademicYear());
        return;
    }

    await interaction.reply(
        UserKhsEmbed(commandData)
    );

    commandData.filter = (btnInteraction) => {
        return btnInteraction.user.id === user.id && (btnInteraction.customId == "evenBtn"+buttonIdTag || btnInteraction.customId == "oddBtn"+buttonIdTag);
    }
    interactionHandler(commandData)
}

async function interactionHandler(param){
    const { interaction, filter, buttonIdTag } = param;
    const collector = interaction.channel.createMessageComponentCollector({filter, max:1, time: 10000})

    collector.on('collect', async (buttonInteraction) => {
        await buttonInteraction.deferUpdate();
    })

    collector.on('end', async (buttonInteraction) => {
        if(buttonInteraction.first() == undefined){
            await interaction.editReply({components: []});
            return;
        };

        if(buttonInteraction.first().customId === "evenBtn"+buttonIdTag){
            param.isOddSemester = false;
        }

        else if(buttonInteraction.first().customId === "oddBtn"+buttonIdTag){
            param.isOddSemester = true;
        }
        
        param.userKhsData = await getKhsData(param);
        

        await interaction.editReply(
            UserKhsEmbed(param)
        );

        interactionHandler(param);
    })
}

async function getKhsData(param){
    const { userData, isOddSemester, tahunAkademik } = param;
    const { nim, password } = userData;
    const semester = isOddSemester ? 1 : 2;

    return getKhs(nim, password, semester, tahunAkademik);
}

module.exports = {
    khs : khs
}