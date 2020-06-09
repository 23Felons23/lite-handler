const checkPerms = require('../utils/checkPerms');
const { MessageMentions, Message } = require('discord.js');

module.exports = (client, message) => {
    if(message.author.bot || message.system) return;

    //Check if message stats with prefix
    const prefix = process.env.PREFIX;
    if(!message.content.startsWith(prefix)) return;

    //Define args array, and command
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    //Check permissions
    if(!cmd) return;
    const cmdConfig = cmd.config;
    if (cmdConfig.guildOnly && !message.guild) {
        return message.channel.send(`Command **${command}** can only be used in a guild !`);
    }
    if (cmdConfig.ownerOnly && !process.env.OWNERS.includes(message.author.id)) {
        return message.channel.send(`**You** need to be the bot owner to be able tu use this command !`);
    }
    if (message.guild) {

        const userMissingPerms = checkPerms(message, message.member, cmdConfig.userPermissions);
        const clientMissingPerms = checkPerms(message, message.guild.me, cmdConfig.clientPermissions);
        console.log(clientMissingPerms)
        if (userMissingPerms.length > 0) {
            return message.channel.send(`**You** are missing the following permissions to execute this command : \`${userMissingPerms}\``);
        }
        if (clientMissingPerms.length > 0) {
            return message.channel.send(`**I** am missing the following permissions to execute this command : \`${clientMissingPerms}\``);
        }
    }

    //Run the commands with the arguments
    cmd.run(client, message, args);
}
