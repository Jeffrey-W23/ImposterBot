module.exports = {
    
    // set name and desciption of command
    name: 'invite',
    description: "Send invite code for Among Us!",
    
    // Execute the command
    execute(message, args)
    {
        // check the role of the author, is it moderator?
        if (message.member.roles.cache.some(r => r.name === "Moderator"))
        {
            // check if the author is currently in a voice channel, if not send an error message
            if (!message.member.voice.channelID)
                message.channel.send(`${message.member} Invite code not sent? Please join a voice chat with a group of players!`);
            
            // if the author is in a voice channel
            else
            {
                // const char for game invite code or the argument for sending
                const chrInviteCode = chArgs;

                // new vars for the author object and its current voice channel
                let oAuthorChannel = message.member.voice.channelID;
                let oAuthor = message.member;

                // Get all voice channel in the server
                const aoAllVoiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
                
                // check if the author has a valid channel id and invite code, if not send an error message
                if (message.member.voice.channelID && chrInviteCode.length <= 0)
                    message.channel.send(`${message.member} That's an incorrect command input? An invite code is required for the invite command.`); 
                
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
                                    message.channel.send(`Invite code sent successfully! ${oMember}`);
                                }

                                // if the member is the author
                                else 
                                {
                                    // put a confirmation in text channel
                                    message.channel.send(`${oMember} has created an invite code!`);
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
            message.channel.send(`${message.member} You don't have permission to use that command?`);
        }
    }
}