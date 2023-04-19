const Discord = require('discord.js');
const mongoose = require('mongoose');

module.exports = async (client, interaction, args) => {
    client.simpleEmbed({
        desc: `${client.emotes.animated.loading} Calculating ping...`,
        type: 'editreply'
    }, interaction).then((resultMessage) => {
        const ping = Math.floor(resultMessage.createdTimestamp - interaction.createdTimestamp);

        mongoose.connection.db.admin().ping(function (err, result) {

            var mongooseSeconds = ((result.ok % 60000) / 1000);
            var pingSeconds = ((ping % 60000) / 1000);
            var apiSeconds = ((client.ws.ping % 60000) / 1000);

            client.embed({
                title: `${client.emotes.normal.pong}・Pong`,
                desc: `<:arrow_arrow:1086900523757740082> Check out how fast our bot is`,
                fields: [
                    {
                        name: "<a:api_latency:1090516234635858042> Bot latency",
                        value: `${ping}ms (${pingSeconds}s)`,
                        inline: true,
                    },
                    {
                        name: "<a:api_latency:1090516234635858042> API Latency",
                        value: `${client.ws.ping}ms (${apiSeconds}s)`,
                        inline: true,
                    },
                    {
                        name: "<a:api_latency:1090516234635858042> Database Latency",
                        value: `${result.ok}ms (${mongooseSeconds}s)`,
                        inline: true,
                    }
                ],
                type: 'editreply'
            }, interaction)
        })
    })
}

 