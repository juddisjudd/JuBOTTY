module.exports = {
    name: 'hello',
    execute(channel, tags, message, client) {
        client.say(channel, `Hello, ${tags.username}!`);
    },
};