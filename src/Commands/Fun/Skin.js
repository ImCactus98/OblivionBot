const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Shows a Minecraft skin by a provided Java Edition nickname",
            usage: "<nickname>",
            category: "Fun",
            aliases: ["mcskin"]
        });
    }

    async run(message, args) {
        const Discord = require('discord.js');
        if(!args[0]) return message.reply("Input a Minecraft Java Edition username to get its skin!");
        const skin = new Discord.MessageEmbed()
        .setTitle(`${args[0]}`)
        .setColor(`RANDOM`)
        .setImage(`https://minotar.net/armor/body/${args[0]}/150.png`)
        .setURL(`https://minotar.net/download/${args[0]}`)
        .setFooter("API provided by Minotar");
        message.channel.send(skin);
    }
}