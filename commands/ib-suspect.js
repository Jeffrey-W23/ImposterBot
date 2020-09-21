module.exports = {
    name: 'ib-suspect',
    description: "suspect command",
    execute(message, args){

        message.channel.send(`I saw ${message.member} standing over the body.`);
    }
}