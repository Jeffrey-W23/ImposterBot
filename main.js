//
const Discord = require('discord.js');

//
const client = new Discord.Client();

//
const prefix = '!';

//
const fs = require('fs');

//
client.commands = new Discord.Collection();

//
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

//
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//
client.once('ready', () => {
    console.log('ImposterBot is online!')
});

//
client.on('message', (message) => {
    
    //
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    //
    const args = message.content.slice(prefix.length).split(/ +/);

    //
    const command = args.shift().toLowerCase();

    //
    if(command === 'hello'){
        
        //
        client.commands.get('hello').execute(message, args);
    }

    //
    else if(command === 'suspect'){
        
        //
        client.commands.get('suspect').execute(message, args);
    }

    //
    else if(command === 'emergency'){
        
        //
        client.commands.get('emergency').execute(message, args);
    }

    //
    else if (command === 'am-invite'){

        if(message.member.roles.cache.some(r => r.name === "Moderator"))
            client.commands.get('am-invite').execute(message, args);
        else
            message.channel.send(`${message.member} You don't have permission to use that command?`);
    }
});

// Must be last line of code. Login into discord bot.
client.login('NzU2ODc1NDUzMDAzODU3OTMw.X2YNMg.nnxPRJ3Jezrxw9XXUEboHcS7JTs');