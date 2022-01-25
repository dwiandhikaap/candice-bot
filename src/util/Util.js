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
};
