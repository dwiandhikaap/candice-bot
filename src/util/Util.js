const { botConfig } = require("../DatabaseHandler/ConfigHandler");

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

    if (botConfig.get("sus") && botConfig.get("partners")) {
        sussifyMhsGroup(result, botConfig.get("partners"));
    }

    return result;
}

function sussifyMhsGroup(mhsGroups, partners) {
    let selectedGroupIndices = [];
    for (let i = 0; i < mhsGroups.length; i++) {
        if (mhsGroups[i].length >= partners.length) {
            selectedGroupIndices.push(i);
        }
    }

    if (selectedGroupIndices.length === 0) {
        return;
    }

    const selectedGroupIndex = selectedGroupIndices.sort(() => Math.random() - 0.5)[0];

    let groupIndices = [];
    let memberIndices = [];
    for (let i = 0; i < mhsGroups.length; i++) {
        for (let j = 0; j < mhsGroups[i].length; j++) {
            for (let k = 0; k < partners.length; k++) {
                if (mhsGroups[i][j].nim == partners[k]) {
                    groupIndices.push(i);
                    memberIndices.push(j);
                }
            }
        }
    }

    // swap
    for (let i = 0; i < partners.length; i++) {
        const temp = mhsGroups[selectedGroupIndex][i];

        const groupIndex = groupIndices[i];
        const memberIndex = memberIndices[i];

        mhsGroups[selectedGroupIndex][i] = mhsGroups[groupIndex][memberIndex];
        mhsGroups[groupIndex][memberIndex] = temp;
    }

    // reshuffle
    mhsGroups[selectedGroupIndex].sort(() => Math.random() - 0.5);
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
    sortMhs: sortMhs,

    generateJadwalField: generateJadwalField,
    shuffleMhsGroup: shuffleMhsGroup,
    sussifyMhsGroup: sussifyMhsGroup,
};
