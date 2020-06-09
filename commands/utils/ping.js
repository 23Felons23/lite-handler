module.exports.run = (client, message, args) => {
    message.channel.send("Ping !");
}

module.exports.config = {
    aliases: ["p", "pong"],
    guildOnly: false,
    clientPermissions: [],
    userPermissions: [],
    ownerOnly: false
}
