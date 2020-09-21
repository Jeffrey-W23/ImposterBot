module.exports = {
    
    // set name and desciption of command
    name: 'ping',
    description: "Ping the bot, good for checking it's status!",
    
    // Execute the command
    execute(message, args)
    {
        // send message to the server
        message.channel.send(`Pong`);
    }
}