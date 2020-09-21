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
    
    // try and send a command
    try
    {
        // Send command to command file and log command activation in the console
        m_oClient.aoCommands.get(chCommand).execute(oMessage, chArgs);
        console.log(`${chCommand} command activated!`);
    }

    // catch any invalid commands
    catch
    {
        // send message to discord chat and log error to console
        oMessage.channel.send(`${oMessage.member} "${chCommand} ${chArgs}" is an Invalid command!`);
        console.log(`${chCommand}: An invalid command input!`);
    }
});

// Must be last line of code. Login into discord bot.
m_oClient.login(process.env.BOT_TOKEN);