module.exports = (client) => {
    client.on('connected', (addr, port) => {
        console.log(`* Connected to ${addr}:${port}`);
        const channel = client.getOptions().channels[0];
        client.say(channel, "Beep Boop! I'm alive!");
    });
};
