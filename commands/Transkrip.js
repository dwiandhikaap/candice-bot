const { UserTranskripEmbed, UserNotFound, AuthFailed } = require("../util/CommandEmbed");
const { dbGetData } = require('../util/DatabaseHandler/UserAuthHandler')
const { getTranskrip } = require('../util/RequestHandler')

/**
* @param {CommandInteraction} interaction - User interaction
*/
async function transkrip(interaction){
    const user = interaction.user;
    const date = new Date();
    const userData = await dbGetData(user.id);
    const buttonIdTag = date.getSeconds().toString() + date.getMilliseconds().toString();

    if(userData == null){
        await (UserNotFound());
        return;
    }

    try{
        var transkripData = await getTranskrip(userData.nim, userData.password);
    } catch(err) {
        await interaction.reply(AuthFailed());
        return;
    }

    const dataCount = Object.keys(transkripData.Transkrip).length;
    const currentPage = 1;
    const pages = Math.ceil(dataCount/5);
    const indexRange = [(currentPage-1)*5,Math.min(currentPage*5,dataCount)]

    const filter = (btnInteraction) => {
        return btnInteraction.user.id === user.id && (btnInteraction.customId == "prevBtn"+buttonIdTag || btnInteraction.customId == "nextBtn"+buttonIdTag);
    }

    let commandData = {interaction, filter, user, buttonIdTag, transkripData, dataCount, currentPage, pages, indexRange};

    await interaction.reply(UserTranskripEmbed(commandData));
    interactionHandler(commandData);
}

async function interactionHandler(param){
    const { interaction, filter, buttonIdTag, dataCount } = param;
    
    const collector = interaction.channel.createMessageComponentCollector({filter, max: 1, time: 10000});

    collector.on('collect', async (buttonInteraction) => {
        await buttonInteraction.deferUpdate();
    })

    collector.on('end', async (buttonInteraction) => {
        if(buttonInteraction.first() == undefined){
            await interaction.editReply({components: []})
            return;
        }

        if(buttonInteraction.first().customId == "prevBtn"+buttonIdTag){
            param.currentPage -= 1;
        }
        else if(buttonInteraction.first().customId == "nextBtn"+buttonIdTag){
            param.currentPage += 1;
        }

        param.indexRange = [(param.currentPage-1)*5,Math.min(param.currentPage*5,dataCount)];

        await interaction.editReply(
            UserTranskripEmbed(param)
        );
        interactionHandler(param);
    })
}

module.exports = {
    transkrip : transkrip
}
