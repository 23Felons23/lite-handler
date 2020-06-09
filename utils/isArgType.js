const {MessageMentions} = require('discord.js');

module.exports = (type, arg, message) => {
    if (!arg) return;
    let regex;
    let match;
    if (type === 'memberMention') {
        regex = MessageMentions.USERS_PATTERN;
        match = regex.exec(arg);
        if (match) {
            return message.mentions.users.get(match[1])
        }
    } else if (type === 'roleMention') {
        regex = MessageMentions.ROLES_PATTERN;
        match = regex.exec(arg);
        if (match) {
            return message.mentions.roles.get(match[1])
        }
    } else if (type === 'channelMention') {
        regex = MessageMentions.CHANNELS_PATTERN;
        match = regex.exec(arg);
        if (match) {
            return message.guild.channels.cache.get(match[1]);
        }
    } else if (type === 'username') {
        console.log(message.guild.members.cache.find(u => u.user.username.toLowerCase() === arg.toLowerCase() || u.nickname ? u.nickname.toLowerCase() === arg.toLowerCase() : false))
        return message.guild.members.cache.find(u => u.user.username.toLowerCase() === arg.toLowerCase() || u.nickname ? u.nickname.toLowerCase() === arg.toLowerCase() : false)
    } else if (type === 'usernameStrict') {
        console.log(message.guild.members.cache.find(u => u.user.username.toLowerCase() === arg.toLowerCase() || u.nickname.toLowerCase() === arg.toLowerCase()))
        return message.guild.members.cache.find(u => u.user.username.toLowerCase() === arg.toLowerCase() || u.nickname.toLowerCase() === arg.toLowerCase())
    }
}
