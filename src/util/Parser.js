function parseMakul(makulData) {
    let result = "";
    if (Object.keys(makulData).length == 0) {
        return ":warning:  **No data found!**";
    }

    for (const makul of makulData) {
        const { Kode, NamaMk, JmlSks, JmlPresensiKuliah, IsHadirMID, IsHadirUAS } = makul;

        result += `
		**• ${NamaMk} - ${Kode}** - *${JmlSks} SKS*
		▸ Presensi  : **${JmlPresensiKuliah}**
		▸ Hadir UTS : **${IsHadirMID ? "Ya" : "Tidak"}**
		▸ Hadir UAS : **${IsHadirUAS ? "Ya" : "Tidak"}**
		`;
    }
    return result;
}

function parseKhs(khsData) {
    const { Khs } = khsData;
    let result = "";

    if (Object.keys(Khs).length == 0) {
        return ":warning:  **No data found!**";
    }

    for (const infoKhs of Khs) {
        const { Kode, NamaMk, JmlSks, Nilai } = infoKhs;

        result += `
		**• ${NamaMk} - ${Kode}** - *${JmlSks} SKS*
		▸ Nilai  : **${Nilai === null ? "Belum ada data!" : Nilai}**
		`;
    }
    return result;
}

function parseTranskrip(transkripData, indexRange) {
    const { Transkrip } = transkripData;
    let result = "";

    if (Object.keys(Transkrip).length == 0) {
        return ":warning:  **No data found!**";
    }

    for (let i = indexRange[0]; i < indexRange[1]; i++) {
        const { Kode, NamaMk, JmlSks, Nilai, NamaSifatMk } = Transkrip[i];

        result += `
		**• ${NamaMk} - ${Kode}** - *${JmlSks} SKS*
		▸ Nilai  : **${Nilai === null ? "Belum ada data!" : Nilai}**
		▸ Tipe  : **${NamaSifatMk === null ? "Belum ada data!" : NamaSifatMk}**
		`;
    }

    return result;
}

function parseMhs(mhsData) {
    let result = "";
    let index = 1;
    for (const mhs of mhsData) {
        result += `${index}. ${mhs.name} - **${mhs.nim}**\n`;
        index++;
    }
    return result;
}

function parseMhsGroup(mhsGroup) {
    let result = ``;
    for (let i = 0; i < mhsGroup.length; i++) {
        result += `**Group ${i + 1}**\n`;
        for (let j = 0; j < mhsGroup[i].length; j++) {
            result += `${j + 1}. ${mhsGroup[i][j].name} - ${mhsGroup[i][j].nim}\n`;
        }
        result += `\n`;
    }

    return result;
}

module.exports = {
    parseMakul: parseMakul,
    parseKhs: parseKhs,
    parseMhs: parseMhs,
    parseMhsGroup: parseMhsGroup,
    parseTranskrip: parseTranskrip,
};
