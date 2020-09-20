module.exports = {
    name: 'am-invite',
    description: "Send invite code for Among Us!",
    execute(message, args){






        if (!message.member.voice.channelID)
            message.channel.send(`${message.member} Invite code not sent? Please join a voice chat with a group of players!`);
        
        else{

            const inviteCode = args;

            let UserChannel = message.member.voice.channelID;
            let Author = message.member; // 8==D

            const AllVoiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
            
            if(message.member.voice.channelID && inviteCode.length <= 0)
                message.channel.send(`${message.member} That's an incorrect command input? An invite code is required for the invite command.`); 
            
            AllVoiceChannels.forEach(c => {

                if (c.id === UserChannel) {

                    c.members.forEach((member) => {
                        
                        if(inviteCode.length > 0) {

                            if (member.id != Author.id) {
                                member.send(inviteCode.join(' '));
                                message.channel.send(`Invite code sent successfully! ${member}`);
                            }

                            else {
                                message.channel.send(`${member} has created an invite code!`);
                            }
                        }
                    });
                }
            }); 
        }
    }
}