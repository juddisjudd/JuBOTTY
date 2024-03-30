const axios = require('axios');
const zoneMappings = require('../../../data/games/d2r/zone_mappings.json');

module.exports = {
    name: 'tz',
    execute(channel, tags, message, client) {
        axios.get('https://www.d2emu.com/api/v1/tz')
            .then(response => {
                const data = response.data;

                const getFirstMatchingZone = (zoneIds) => {
                    for (let id of zoneIds) {
                        if (zoneMappings[id]) {
                            return zoneMappings[id].location;
                        }
                    }
                    return `Zone ${zoneIds[0]}`;
                };

                const currentZoneData = getFirstMatchingZone(data.current);
                const nextZoneData = getFirstMatchingZone(data.next);

                client.say(channel, `📗 CURRENT TZ: ${currentZoneData} | 📒 NEXT TZ: ${nextZoneData}`);
            })
            .catch(err => {
                console.error(err);
                client.say(channel, `@${tags.username}, error fetching terror zone information.`);
            });
    },
};
