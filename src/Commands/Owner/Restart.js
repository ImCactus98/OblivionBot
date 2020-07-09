const Command = require('../../Structures/Command');
const config = require('../../../config.json');
const OblivionClient = require('../../Structures/OblivionClient');
const newClient = new OblivionClient(config);

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Restart the bot",
            category: "Owner"
        });
    }

    async run(message) {
        if (!this.client.owners.includes(message.author.id)) return message.channel.send("Only bot owners may do this!");
        const msg = await message.channel.send("Restarting...");
        msg.delete()
        .then(this.client.destroy())
        .then(newClient.start());
        
    }
}