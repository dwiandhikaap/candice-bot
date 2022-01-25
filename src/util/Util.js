function isInvalidYear(year) {
    return !(
        /^\d{4}\/\d{4}$/i.test(year) &&
        parseInt(year.split("/")[1]) - parseInt(year.split("/")[0]) === 1 &&
        parseInt(year.split("/")[0]) <= new Date().getFullYear()
    );
}

function isInvalidToken(token) {
    return token.length != 5;
}

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

function sortMhs(mhsData) {
    return [...mhsData].sort((a, b) => {
        if (a.nim < b.nim) return -1;
        if (a.nim > b.nim) return 1;
        return 0;
    });
}

// `count` could be either the number of groups
// or the number of members for each group
function shuffleMhsGroup(mhsData, shuffleByMember, count) {
    let groupCount;
    const studentCount = mhsData.length;
    const shuffled = mhsData.sort(() => Math.random() - 0.5);

    if (shuffleByMember) {
        groupCount = Math.ceil(studentCount / count);
    } else {
        groupCount = Math.min(count, studentCount);
    }

    const result = [...Array(groupCount)].map(() => []);

    for (let i = 0; i < studentCount; i++) {
        result[i % groupCount].push(shuffled[i]);
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

function generateJadwalField(jadwalData, semester, userConcentration) {
    const jadwalField = [];

    const jadwalUser = jadwalData[semester][userConcentration];

    for (jadwal of jadwalUser) {
        const { hari, data } = jadwal;
        let jadwalValue = "";
        const jadwalHarian = {
            name: `**${hari}**`,
            inline: true,
        };

        if (Object.keys(data).length == 0) {
            jadwalValue = "-";
        } else {
            for (makul of data) {
                const { name, startTime, endTime } = makul;
                jadwalValue += `# ${name}\n${startTime} - ${endTime} WIB\n\n`;
            }
        }

        jadwalHarian.value = `\`\`\`md\n${jadwalValue}\`\`\``;
        jadwalField.push(jadwalHarian);
    }

    return jadwalField;
}

module.exports = {
    isInvalidYear: isInvalidYear,
    isInvalidToken: isInvalidToken,
    parseMakul: parseMakul,
    parseKhs: parseKhs,
    sortMhs: sortMhs,
    parseMhs: parseMhs,
    parseMhsGroup: parseMhsGroup,
    parseTranskrip: parseTranskrip,
    generateJadwalField: generateJadwalField,
    shuffleMhsGroup: shuffleMhsGroup,
};
