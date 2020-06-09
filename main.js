require('dotenv').config();
const fs = require('fs');

const {Client, Collection} = require('discord.js');
const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();

const loadCommands = (path) => {
    const directories = fs.readdirSync(path);
    if(!directories.length > 0) console.error(`[LOADING WARNING] No directory was found in the directory ${path}.`);
    directories.forEach(async (dirPath) => {
        let dir;
        try {
            dir = fs.readdirSync(`${path}${dirPath}`)
        } catch {
            //dirPath is not a directory
        }
        if (dir && dir.length > 0) {
            dir.forEach(file => {
                if (!file.endsWith('.js')) return;

                const commandName = file.replace('.js', '');
                const props = require(`${path}${dirPath}/${file}`);

                //Check if the prop guildOnly was exported
                if(props.config.guildOnly === undefined) throw new Error(`[LOADING ERROR] The command ${commandName} doesn't have the prop guildOnly. Please set it to true or false.`)

                props.category = dirPath;
                client.commands.set(commandName, props);

                props.config.aliases.forEach(alias => {
                    client.aliases.set(alias, commandName);
                });
            });
        }
    });
}

const loadEvents = (path) => {
    const files = fs.readdirSync(path);
    if(!files.length > 0) throw new Error(`[LOADING ERROR] No event was found in the directory ${path}.`)
    files.forEach(file => {
        if (!file.endsWith('.js')) return;

        const event = require(`${path}${file}`);
        const eventName = file.replace('.js', '');
        if(event.constructor !== Function) throw new Error(`[LOADING ERROR] The event ${eventName} doesn't have any export function.`);

        client.on(eventName, event.bind(null, client));
    });
}

loadCommands('./commands/');
loadEvents('./events/');

client.login(process.env.BOT_TOKEN);
