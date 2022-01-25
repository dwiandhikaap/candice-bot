function CommandInfoEmbed(param) {
    return {
        embeds: [
            {
                title: param.title,
                color: "#4278f5",
                description: `${param.desc} \n\n**How to use**\n\`${param.syntax}\`\n\n**Example**\n\`${param.example}\``,
            },
        ],
    };
}
exports.CommandInfoEmbed = CommandInfoEmbed;
