const { Client, Collection } = require('discord.js');
const Util = require('./Util.js');
const { ErelaClient } = require('erela.js');
const nodes = [
    {
        host: "localhost",
        port: 2333,
        password: "youshallnotpass",
    }
]

module.exports = class OblivionClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone'
		});
		this.validate(options);

		this.commands = new Collection();

		this.aliases = new Collection();

		this.utils = new Util(this);

		this.once('ready', () => {
			console.log(`[Oblivion] Ready to go!`);
			console.log(`[Oblivion] Logged in as ${this.user.username}!`);
			this.music = new ErelaClient(this, nodes);
			this.music.on("nodeConnect", node => console.log("[Erela.js] New node connected"));
			this.music.on("nodeError", (node, error) => console.log(`[Erela.js] Node error: ${error.message}`));
			this.music.on("trackStart", (player, track) => player.textChannel.send(`Now playing: **${track.title}**`));
			this.music.on("queueEnd", player => {
				this.music.players.destroy(player.guild.id);
			});
			this.user.setActivity(`${this.prefix}help | ${this.prefix}invite`);
		});

		this.on('message', async (message) => {
			const mentionRegex = RegExp(`^<@!${this.user.id}>$`);
			const mentionRegexPrefix = RegExp(`^<@!${this.user.id}> `);

			if (!message.guild || message.author.bot) return;

			if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.prefix}\`.`);

			const prefix = message.content.match(mentionRegexPrefix) ?
				message.content.match(mentionRegexPrefix)[0] : this.prefix;
			
			if(!message.content.startsWith(prefix)) return;

			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

			const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
			if (command) {
				command.run(message, args);
			}
		});
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		if (!options.token) throw new Error('You must pass the token for the client.');
		this.token = options.token;

		if (!options.prefix) throw new Error('You must pass a prefix for the client.');
		if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of String.');
		this.prefix = options.prefix;

		this.owners = options.owners;
	}

	async start(token = this.token) {
		this.utils.loadCommands();
		super.login(token);
	}

};
