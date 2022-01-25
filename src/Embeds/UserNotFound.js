function UserNotFound() {
    return {
        embeds: [
            {
                color: "#4278f5",
                description: `No account found. Register via \`/register [NIM] [Password]\``,
            },
        ],
    };
}
exports.UserNotFound = UserNotFound;
