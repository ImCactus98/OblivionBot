const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['ver'],
            description: "Shows more informations about the bot",
            category: "Information"
        });
    }

    async run(message) {
        let verMsg = "__**Oblivion Bot**__\n";
        verMsg += "This is a bot entirely made in Discord.js and other libraries.\n";
        verMsg += "The Music service is made using Erela.js and Lavalink.\n";
        verMsg += "The bot is made with heart by <@705834500353032234> and <@480987124405895168>\n";
        verMsg += "__Support Discord server:__ https://discord.gg/bj826WU";
        return message.channel.send(verMsg);
    }
}