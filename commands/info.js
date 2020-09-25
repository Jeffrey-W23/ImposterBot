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
// Purpose: Post a message with some basic bot information.
//
// Author: Thomas Wiltshire
//--------------------------------------------------------------------------------------

module.exports = {
    
    // set name and desciption of command
    name: 'info',
    description: "Post a message with some basic bot information.",
    
    // Execute the command
    execute(oMessage, chArgs, chNewUsrChannel, chOldUsrChannel)
    {
        // Send a message to the text channel
        oMessage.channel.send(
            {
                // Start embed message
                embed: 
                {
                    // set the color, title and description of the embed
                    color: 7261139,
                    title: "ImpostorBot Information",
                    description: "Originally created for the VeryPoliteGamer community, ImpostorBot is a Discord bot designed to help Twitch streamers easily invite their viewers to play Among Us without sharing the invite code publicly. No need for private messaging or other long manual solutions.\n\u200B\n\ Check it out: [thomaswiltshire.com](https://thomaswiltshire.com/pages/projects.html)\n\u200B\n\ List of all available commands for use with the ImpostorBot are found using the ?help command!",
                    
                    // footer image from the bot website
                    image: 
                    {
                        url: "https://thomaswiltshire.com/images/bottitle.png"
                    },
                }
            }
        );
    }
}