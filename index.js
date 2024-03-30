require('dotenv').config();

const tmi = require('tmi.js');
const fs = require('fs');
const path = require('path');
const handleCommands = require('./utils/commandHandler');

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        secure: true,
        reconnect: true,
    },
    identity: {
        username: process.env.USERNAME,
        password: process.env.OAUTH_TOKEN,
    },
    channels: process.env.CHANNELS.split(','),
});

const commands = new Map();
function readCommands(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            readCommands(fullPath);
        } else if (file.endsWith('.js')) {
            const command = require(fullPath);
            commands.set(command.name, command);
        }
    }
}

readCommands(path.join(__dirname, 'commands'));

handleCommands(client, commands);

const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    event(client);
}

client.connect().catch(console.error);
