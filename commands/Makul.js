const { Interaction } = require("discord.js");
const { UserMakulEmbed, UserNotFound, NotifEmbed } = require("../util/CommandEmbed");
const { dbGetData } = require("../util/DatabaseHandler");
const { getMakul } = require("../util/RequestHandler");

/**
* @param {Interaction} interaction User message
*/
async function makul(interaction){
    const sender = interaction.user;
    const date = new Date();

    const userData = await dbGetData(sender.id);

    let isOddSemester = true;
    let tahunAkademik = `${date.getFullYear()/date.getFullYear()+1}`
    tahunAkademik = interaction.options.getString("tahunakademik", true);

    const buttonIdTag = date.getSeconds().toString() + date.getMilliseconds().toString();

    if(!(/^\d{4}\/\d{4}$/i).test(tahunAkademik)){
        interaction.reply(NotifEmbed({
            desc: "Invalid academic year!"
        }));
        return;
    }

    if(userData == null){
        interaction.reply(UserNotFound());
        return;
    }

     try{
        var userMakulData = await getMakulData(userData.nim, userData.password, isOddSemester, tahunAkademik);
    }catch(err){
        interaction.reply(NotifEmbed({
            desc: "Authentication failed! Please check your username and password!"
        }));
        return;
    } 
    interaction.reply(
        UserMakulEmbed(buttonIdTag, userMakulData, isOddSemester, tahunAkademik)
    );

    const filter = (btnInteraction) => {
        return btnInteraction.user.id === sender.id && (btnInteraction.customId == "evenBtn"+buttonIdTag || btnInteraction.customId == "oddBtn"+buttonIdTag);
    }

    interactionHandler(interaction, filter, buttonIdTag, userData, isOddSemester, tahunAkademik)
}

async function interactionHandler(interaction, filter, buttonIdTag, userData, isOddSemester, tahunAkademik){
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
            isOddSemester = false;
        }

        else if(buttonInteraction.first().customId === "oddBtn"+buttonIdTag){
            isOddSemester = true;
        }
        
        const userMakulData = await getMakulData(userData.nim, userData.password, isOddSemester, tahunAkademik);
        
        interaction.editReply(
            UserMakulEmbed(buttonIdTag, userMakulData, isOddSemester, tahunAkademik)
        );

        interactionHandler(interaction, filter, buttonIdTag, userData, isOddSemester, tahunAkademik);
    })
}

async function getMakulData(username, password, isOddSemester, tahunAkademik){
    const semester = isOddSemester ? 1 : 2;

    return getMakul(username, password, semester, tahunAkademik);
}

module.exports = {
    makul : makul
}