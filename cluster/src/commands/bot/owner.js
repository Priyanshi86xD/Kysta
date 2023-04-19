const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📘・Owner information`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "<a:Owner:1086877613450072176> Owner name",
            value: `Frenzzys`,
            inline: true,
        },
        {
            name: "<:channels:1090503931022544937>Discord tag",
            value: `Frenzzys#1230`,
            inline: true,
        },
        {
            name: "<:DiscordPartner:1086877916010401832>  Organization",
            value: `Kysta`,
            inline: true,
        },
        {
            name: "<a:Computer:1090503129319079996> Website",
            value: `[https://kysta.tech](https://kysta.tech)`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 