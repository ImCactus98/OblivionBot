const Command = require('../../Structures/Command');
const request = require('request');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Shows some informations about the provided server. If there's a role called _mcpestatus, the bot will use 19132 as the default port.",
            usage: "<ip> <port>",
            category: "Fun",
            aliases: ["mcstatus"]
        });
    }

    async run(message, args) {
        var port = args[1];
        if(!args[0]) return message.reply('Please, input the IP of the Minecraft server');
        if(!args[1]) {
            let mcpestatus = message.guild.roles.cache.find(r => r.name === "_mcpestatus");
            if(mcpestatus) {
                port = 19132;
            } else {
                port = 25565
            }
        }
        const url = 'https://api.mcsrvstat.us/2/' + args[0] + ':' + port;
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.channel.send('Error getting Minecraft server status...');
            }
            body = JSON.parse(body);
            var status = '**Status of ' + args[0] + ':' + port + '**\n\nServer currently is offline.';
            if(body.online == true) {
                status = '**Status of ' + body.motd.clean + '**\n\nServer currently is online';
                status += '\n__Online:__ ' + body.players.online + '/' + body.players.max;
                if(body.icon) {
                    status += '\n__Platform:__ Java Edition';
                    if(body.software) {
                        status += '\n__Software:__ ' + body.software;
                    }
                } else {
                    status += '\n__Platform:__ Bedrock Edition';
                    if(body.software) {
                        status += '\n__Software:__ ' + body.software + ' for MCPE ' + body.version;
                    }
                }
            }
            message.channel.send(status);
        });
    }
}