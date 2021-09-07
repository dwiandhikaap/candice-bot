const { Interaction, ButtonInteraction } = require("discord.js");
const { UserTranskripEmbed } = require("../util/CommandEmbed");
const { dbGetData } = require('../util/DatabaseHandler')
const { getTranskrip } = require('../util/RequestHandler')

const tempData = {
    "Transkrip": [
        {
            "Kode": "ST068",
            "NamaMk": "ALGORITMA DAN PEMROGRAMAN",
            "NamaMkEn": "ALGORITHM AND PROGRAMMING",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 4,
            "Nilai": "A"
        },
        {
            "Kode": "ST008",
            "NamaMk": "BAHASA INGGRIS I",
            "NamaMkEn": "ENGLISH I",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "A"
        },
        {
            "Kode": "ST016",
            "NamaMk": "BAHASA INGGRIS II",
            "NamaMkEn": "ENGLISH II",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "A"
        },
        {
            "Kode": "ST070",
            "NamaMk": "ETIKA PROFESI",
            "NamaMkEn": "PROFESSION ETHICS",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "A"
        },
        {
            "Kode": "ST138",
            "NamaMk": "FOTOGRAFI",
            "NamaMkEn": "PHOTOGRAPHY",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "A"
        },
        {
            "Kode": "ST160",
            "NamaMk": "HARDWARE/SOFTWARE I",
            "NamaMkEn": "HARDWARE/SOFTWARE I",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "A"
        },
        {
            "Kode": "ST137",
            "NamaMk": "KALKULUS",
            "NamaMkEn": "CALCULUS",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "A"
        },
        {
            "Kode": "ST029",
            "NamaMk": "KOMPUTER GRAFIS",
            "NamaMkEn": "COMPUTER GRAPHICS",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "A"
        },
        {
            "Kode": "ST014",
            "NamaMk": "KOMUNIKASI DATA",
            "NamaMkEn": "DATA COMMUNICATION",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 4,
            "Nilai": "A"
        },
        {
            "Kode": "ST013",
            "NamaMk": "LINGKUNGAN BISNIS",
            "NamaMkEn": "BUSINESS ENVIRONMENT",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "A"
        },
        {
            "Kode": "ST081",
            "NamaMk": "LOGIKA  INFORMATIKA",
            "NamaMkEn": "LOGIC INFORMATIC",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "A"
        },
        {
            "Kode": "ST011",
            "NamaMk": "MANAJEMEN UMUM",
            "NamaMkEn": "GENERAL MANAGEMENT",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "B"
        },
        {
            "Kode": "ST021",
            "NamaMk": "PEMROGRAMAN",
            "NamaMkEn": "PROGRAMMING",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "A"
        },
        {
            "Kode": "ST002",
            "NamaMk": "PENDIDIKAN AGAMA",
            "NamaMkEn": "RELIGION EDUCATION",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "A"
        },
        {
            "Kode": "ST001",
            "NamaMk": "PENDIDIKAN PANCASILA",
            "NamaMkEn": "PANCASILA EDUCATION",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "A"
        },
        {
            "Kode": "ST139",
            "NamaMk": "PENGANTAR ILMU KOMPUTER",
            "NamaMkEn": "INTRODUCTION TO COMPUTER SCIENCE",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 2,
            "Nilai": "B"
        },
        {
            "Kode": "ST019",
            "NamaMk": "SISTEM OPERASI",
            "NamaMkEn": "OPERATING SYSTEMS",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 4,
            "Nilai": "A"
        },
        {
            "Kode": "ST015",
            "NamaMk": "STRUKTUR DATA",
            "NamaMkEn": "DATA STRUCTURES",
            "SifatMk": "W",
            "NamaSifatMk": "Wajib",
            "JmlSks": 4,
            "Nilai": "A"
        }
    ],
    "Ipk": 3.910000000000000142108547152020037174224853515625,
    "JmlSks": 44,
    "SksWajib": 44,
    "SksKonsentrasi": 0,
    "SksPilihan": 0
}
/**
* @param {Interaction} interaction - User interaction
*/
async function transkrip(interaction){
    const user = interaction.user;
    const date = new Date();
    const userData = await dbGetData(user.id);
    const buttonIdTag = date.getSeconds().toString() + date.getMilliseconds().toString();

    if(userData == null){
        interaction.reply(UserNotFound());
        return;
    }

    try{
        var transkripData = tempData;
        //var transkripData = await getTranskrip(userData.nim, userData.password);
    } catch(err) {
        interaction.reply(NotifEmbed({
            desc: "Authentication failed! Please check your username and password!"
        }));
    }

    const dataCount = Object.keys(transkripData.Transkrip).length;
    const currentPage = 1;
    const pages = Math.ceil(dataCount/6);
    const indexRange = [(currentPage-1)*6,Math.min(currentPage*6,dataCount)]

    const filter = (btnInteraction) => {
        return btnInteraction.user.id === user.id && (btnInteraction.customId == "prevBtn"+buttonIdTag || btnInteraction.customId == "nextBtn"+buttonIdTag);
    }

    let commandData = {interaction, filter, user, buttonIdTag, transkripData, dataCount, currentPage, pages, indexRange};

    interaction.reply(UserTranskripEmbed(commandData));
    interactionHandler(commandData);
}

async function interactionHandler(param){
    const { interaction, filter, buttonIdTag, dataCount } = param;
    
    const collector = interaction.channel.createMessageComponentCollector({filter, max: 1, time: 10000});

    collector.on('collect', async (buttonInteraction) => {
        buttonInteraction.deferUpdate();
    })

    collector.on('end', async (buttonInteraction) => {
        if(buttonInteraction.first() == undefined){
            interaction.editReply({components: []})
            return;
        }

        if(buttonInteraction.first().customId == "prevBtn"+buttonIdTag){
            param.currentPage -= 1;
        }
        else if(buttonInteraction.first().customId == "nextBtn"+buttonIdTag){
            param.currentPage += 1;
        }

        param.indexRange = [(param.currentPage-1)*6,Math.min(param.currentPage*6,dataCount)];

        interaction.editReply(
            UserTranskripEmbed(param)
        );
        interactionHandler(param);
    })
}

module.exports = {
    transkrip : transkrip
}
