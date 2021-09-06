const { Interaction } = require("discord.js");
const { UserNotFound, NotifEmbed, UserKhsEmbed } = require("../util/CommandEmbed");
const { dbGetData } = require("../util/DatabaseHandler");
const { getKhs } = require("../util/RequestHandler");

/**
* @param {Interaction} interaction User command
*/
async function khs(interaction){
    const sender = interaction.user;
    const date = new Date();

    const userData = await dbGetData(sender.id);

    let isOddSemester = true;
    const tahunAkademik = interaction.options.getString("tahunakademik", true);

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
        var userKhsData = await getKhsData(userData.nim, userData.password, isOddSemester, tahunAkademik);
    }catch(err){
        interaction.reply(NotifEmbed({
            desc: "Authentication failed! Please check your username and password!"
        }));
        return;
    }  

    interaction.reply(
        UserKhsEmbed(buttonIdTag, userKhsData, isOddSemester, tahunAkademik)
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
        
        const userKhsData = await getKhsData(userData.nim, userData.password, isOddSemester, tahunAkademik);
        

        interaction.editReply(
            UserKhsEmbed(buttonIdTag, userKhsData, isOddSemester, tahunAkademik)
        );

        interactionHandler(interaction, filter, buttonIdTag, userData, isOddSemester, tahunAkademik);
    })
}

async function getKhsData(username, password, isOddSemester, tahunAkademik){
    const semester = isOddSemester ? 1 : 2;

    return getKhs(username, password, semester, tahunAkademik);
}

module.exports = {
    khs : khs
}