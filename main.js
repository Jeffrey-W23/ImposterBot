// LICENSE //
//--------------------------------------------------------------------------------------
// Copyright 2020 Thomas Wiltshire
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this 
// software and associated documentation files (the "ImposterBot"), to deal in the Software 
// without restriction, including without limitation the rights to use, copy, modify, 
// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
// permit persons to whom the Software is furnished to do so, subject to the following 
// conditions:
//
// The above copyright notice and this permission notice shall be included in all copies 
// or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
// PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
// OR OTHER DEALINGS IN THE SOFTWARE.
//
// For more information: https://opensource.org/licenses/mit-license.php
//--------------------------------------------------------------------------------------

// INFORMATION //
//--------------------------------------------------------------------------------------
// Purpose: Main.js used to initiate bot and used as a main hub for all the discord commands.
//
// Author: Thomas Wiltshire
//--------------------------------------------------------------------------------------

// REQUIRES //
//--------------------------------------------------------------------------------------
// require dotenv dependencies for bot token input
require('dotenv').config();
//--------------------------------------------------------------------------------------

// VARIABLES //
//--------------------------------------------------------------------------------------
// const discord object for the discord js module
const m_oDiscord = require('discord.js');

// const for discord client object
const m_oClient = new m_oDiscord.Client();

// const char for command prefix
const m_chPrefix = '!';

// const for the file system object
const m_oFS = require('fs');

// Commands array of discord objects, under the client
m_oClient.aoCommands = new m_oDiscord.Collection();

// const aaray of files for storing command files
const m_afCommandFiles = m_oFS.readdirSync('./commands/').filter(file => file.endsWith('.js'));
//--------------------------------------------------------------------------------------

// loop through files in the command files array
for (const fFile of m_afCommandFiles)
{
    // const for a command file
    const fCommand = require(`./commands/${fFile}`);
    
    // set command files in the discord client collection
    m_oClient.aoCommands.set(fCommand.name, fCommand);
}







//
m_oClient.once('ready', () => {console.log('The ImposterBot is now online!')});

//
m_oClient.on('message', (oMessage) => 
{    
    //
    if (!oMessage.content.startsWith(m_chPrefix) || oMessage.author.bot) 
        return;

    //
    const chArgs = oMessage.content.slice(m_chPrefix.length).split(/ +/);

    //
    const chCommand = chArgs.shift().toLowerCase();
    
    //
    try
    {
        //
        m_oClient.aoCommands.get(chCommand).execute(oMessage, chArgs);
        console.log(`${chCommand} command activated!`);
    }

    //
    catch
    {
        //
        message.channel.send(`Invalid command!`);
        console.log(`${chCommand}: An invalid command input!`);
    }


/*     //
    if (command === 'hello'){
        
        //
        client.commands.get('hello').execute(message, args);
        console.log('hello command activated!')
    }

    //
    else if (command === 'suspect'){
        
        //
        client.commands.get('suspect').execute(message, args);
        console.log('suspect command activated!')
    }

    //
    else if (command === 'emergency'){
        
        //
        client.commands.get('emergency').execute(message, args);
        console.log('emergency command activated!')
    }

    //
    else if (command === 'among-invite'){

        console.log('among-invite command activated!')

        if(message.member.roles.cache.some(r => r.name === "Moderator"))
            client.commands.get('among-invite').execute(message, args);
        else
            message.channel.send(`${message.member} You don't have permission to use that command?`);
    } */
});

// Must be last line of code. Login into discord bot.
m_oClient.login(process.env.BOT_TOKEN);