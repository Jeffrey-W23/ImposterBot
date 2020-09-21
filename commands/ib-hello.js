module.exports = {
    name: 'ib-hello',
    description: "This is the ping command!",
    execute(message, args){

        message.channel.send(`${message.member} is following me. he might be killer.`);
    }
}