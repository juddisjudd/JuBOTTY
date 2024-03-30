module.exports = (client, commands) => {
    client.on('message', (channel, tags, message, self) => {
        if (self) return;

        if (!message.startsWith('!')) return;

        const args = message.slice(1).split(' ');
        const commandName = args.shift().toLowerCase();

        const command = commands.get(commandName);

        if (!command) return;

        try {
            command.execute(channel, tags, message, client, args);
        } catch (error) {
            console.error(error);
            client.say(channel, `@${tags.username}, there was an error trying to execute that command!`);
        }
    });
};
