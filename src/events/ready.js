import Discord from 'discord.js';

export default (client) => {

    client.once('ready', () => {

        
    console.log(`Bot is ready!`);
    client.user.setActivity({name:'Hello!',type:Discord.ActivityType.Playing});

    })
}