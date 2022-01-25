function NotifEmbed(param) {
    return {
        embeds: [
            {
                title: param.title,
                color: "#4278f5",
                description: `${param.desc}`,
            },
        ],
    };
}
exports.NotifEmbed = NotifEmbed;
