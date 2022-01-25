function AuthFailed() {
    return {
        embeds: [
            {
                color: "#4278f5",
                description: "Authentication failed! Please do `/register` with your correct username and password!",
            },
        ],
    };
}
exports.AuthFailed = AuthFailed;
