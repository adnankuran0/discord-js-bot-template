import 'dotenv/config';
import Discord from 'discord.js';

export default client => {
    
    const prefix = process.env.prefix;

    client.on('messageCreate', msg => {
        if (!msg.content.startsWith(prefix)) return;
        const args = msg.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if(!command) return;

        try{
            command.execute(msg);
        } catch(e) {
            console.error(e);
            msg.reply("There is an error with this command!");
        }
        
    })
}