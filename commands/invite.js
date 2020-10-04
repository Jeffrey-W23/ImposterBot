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
// Purpose: Send a private message to all members of a voice channel, mostly used for 
// Among Us invite codes.
//
// Author: Thomas Wiltshire
//--------------------------------------------------------------------------------------

module.exports = {
    
    // set name and desciption of command
    name: 'invite',
    description: "Send a private message to all members of a voice channel, mostly used for Among Us invite codes.",
    
    // Execute the command
    execute(oMessage, chArgs, chNewUsrChannel, chOldUsrChannel)
    {
        // check the role of the author, is it moderator?
        if (oMessage.member.roles.cache.some(r => r.name === "Moderator") || oMessage.member.roles.cache.some(r => r.name === "moderator"))
        {
            // check if the author is currently in a voice channel, if not send an error message
            if (!oMessage.member.voice.channelID)
                oMessage.channel.send(`${oMessage.member} Invite code not sent? Please join a voice chat with a group of players!`);
            
            // if the author is in a voice channel
            else
            {
                // const char for game invite code or the argument for sending
                const chrInviteCode = chArgs;

                // new vars for the author object and its current voice channel
                let oAuthorChannel = oMessage.member.voice.channelID;
                let oAuthor = oMessage.member;

                // Get all voice channel in the server
                const aoAllVoiceChannels = oMessage.guild.channels.cache.filter(c => c.type === 'voice');
                
                // check if the author has a valid channel id and invite code, if not send an error message
                if (oMessage.member.voice.channelID && chrInviteCode.length <= 0)
                    oMessage.channel.send(`${oMessage.member} That's an incorrect command input? An invite code is required for the invite command.`); 
                
                // Loop through each voice channel in the server
                aoAllVoiceChannels.forEach(c => 
                {
                    // check if voice channel id matches author channel
                    if (c.id === oAuthorChannel) 
                    {
                        // Loop through each member in the authors voice channel
                        c.members.forEach((oMember) => 
                        {
                            // check invite code length
                            if (chrInviteCode.length > 0) 
                            {
                                // if the channel members id matches the author
                                if (oMember.id != oAuthor.id) 
                                {
                                    // send a private message of the invite code to the channel member, put a confirmation in text channel
                                    oMember.send(chrInviteCode.join(' '));
                                    oMessage.channel.send(`Invite code sent successfully! ${oMember}`);
                                }

                                // if the member is the author
                                else 
                                {
                                    // put a confirmation in text channel
                                    oMessage.channel.send(`${oMember} has created an invite code!`);
                                }
                            }
                        });
                    }
                }); 
            }
        }

        // if the author is not a moderator role
        else
        {
            // send a error message in text channel
            oMessage.channel.send(`${oMessage.member} You don't have permission to use that command? Please ensure you have the Moderator role before using this command!`);
        }
    }
}