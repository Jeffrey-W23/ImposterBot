module.exports = {
    name: 'emergency',
    description: "emergency command",
    execute(message, args){

        message.channel.send(`I saw yellow vent. Vote yellow.`);
    }
}