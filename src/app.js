import Discord, { Collection } from 'discord.js';
import 'dotenv/config';
import {readdirSync} from 'fs';
const intents = Discord.IntentsBitField.Flags;

const client = new Discord.Client({intents:[
    intents.GuildMembers,
    intents.Guilds,
    intents.GuildMessages,
    intents.GuildInvites,
    intents.GuildMessageReactions,
    intents.MessageContent,
    intents.DirectMessages,
    intents.GuildVoiceStates,
]});



// Event loader

readdirSync("./events").forEach(async file => {
    const event = await import(`./events/${file}`).then(m => m.default);
    event(client);
});


//Command loader
client.commands = new Collection();
readdirSync("./commands").forEach(category => {
    readdirSync(`./commands/${category}`).forEach(async file => {
        const command = await import(`./commands/${category}/${file}`).then(c => c.default);
        client.commands.set(command.name,command);

    });

});


client.login(process.env.token);