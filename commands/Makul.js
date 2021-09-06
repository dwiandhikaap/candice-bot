const { Interaction } = require("discord.js");
const { UserMakulEmbed, UserNotFound, NotifEmbed, InvalidAcademicYear } = require("../util/CommandEmbed");
const { dbGetData } = require("../util/DatabaseHandler");
const { isInvalidYear } = require("../util/Util");
const { getMakul } = require("../util/RequestHandler");

/**
* @param {Interaction} interaction User command
*/
async function makul(interaction){
    const user = interaction.user;
    const date = new Date();
    const userData = await dbGetData(user.id);
    const isOddSemester = true;
    const tahunAkademik = interaction.options.getString("tahunakademik", true);
    const buttonIdTag = date.getSeconds().toString() + date.getMilliseconds().toString();

    let commandData = {interaction, user, date, userData, isOddSemester, tahunAkademik, buttonIdTag};

    if(isInvalidYear(tahunAkademik)){
        interaction.reply(InvalidAcademicYear());
        return;
    }

    if(userData == null){
        interaction.reply(UserNotFound());
        return;
    }

     try{
        commandData.userMakulData = await getMakulData(commandData);
    }catch(err){
        interaction.reply(NotifEmbed({
            desc: "Authentication failed! Please check your username and password!"
        }));
        return;
    } 
    interaction.reply(
        UserMakulEmbed(commandData)
    );

    commandData.filter = (btnInteraction) => {
        return btnInteraction.user.id === user.id && (btnInteraction.customId == "evenBtn"+buttonIdTag || btnInteraction.customId == "oddBtn"+buttonIdTag);
    }

    interactionHandler(commandData);
}

async function interactionHandler(param){
    const {interaction, filter, buttonIdTag} = param;
    const collector = interaction.channel.createMessageComponentCollector({filter, max:1, time: 10000})

    collector.on('collect', async (buttonInteraction) => {
        buttonInteraction.deferUpdate();
    })

    collector.on('end', async (buttonInteraction) => {
        if(buttonInteraction.first() == undefined){
            interaction.editReply({components: []});
            return;
        };

        if(buttonInteraction.first().customId === "evenBtn"+buttonIdTag){
            param.isOddSemester = false;
        }

        else if(buttonInteraction.first().customId === "oddBtn"+buttonIdTag){
            param.isOddSemester = true;
        }
        
        param.userMakulData = await getMakulData(param);
        
        interaction.editReply(
            UserMakulEmbed(param)
        );
        interactionHandler(param);
    })
}

async function getMakulData(param){
    const {userData, isOddSemester, tahunAkademik} = param;
    const {nim, password} = userData
    const semester = isOddSemester ? 1 : 2;

    return getMakul(nim, password, semester, tahunAkademik);
}

module.exports = {
    makul : makul
}