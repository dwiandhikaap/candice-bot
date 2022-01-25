function PresensiEmbed(isSuccess) {
    return {
        embeds: [
            {
                color: "#4278f5",
                description: isSuccess ? "Presensi Sukses ✅" : "Presensi Gagal ❌",
                timestamp: new Date(),
            },
        ],
    };
}
exports.PresensiEmbed = PresensiEmbed;
