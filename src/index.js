const OblivionClient = require('./Structures/OblivionClient');
const config = require('../config.json');

const client = new OblivionClient(config);
client.start();
