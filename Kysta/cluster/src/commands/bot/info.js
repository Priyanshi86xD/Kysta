const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    const promises = [
        client.shard.broadcastEval(client => client.guilds.cache.size),
        client.shard.broadcastEval(client => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        client.shard.broadcastEval(client => client.channels.cache.size),
        client.shard.broadcastEval(client => client.voice.adapters.size)
    ];
    return Promise.all(promises)
        .then(async results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            const totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0);
            const totalVoice = results[3].reduce((acc, voiceCount) => acc + voiceCount, 0);

            const duration = moment.duration(client.uptime).format("\`D\` [days], \`H\` [hrs], \`m\` [mins], \`s\` [secs]");

            client.embed({
                title: `Bot information`,
                desc: `____________________________`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                fields: [
               {
                    name: "<a:bots:1090502150330781818> Information",
                    value: `Kysta is a bot with which you can run your entire server! With no less than 350+ commands, we have a large bot with many options to improve your server! `,
                    inline: false,
                },
                {
                    name: "_____ \n\n│General",
                    value: `_____`,
                    inline: false,
                },
                {
                    name: "<:arrow_arrow:1086900523757740082> Bot name",
                    value: `${client.user.username}`,
                    inline: true,
                },
                {
                    name: "<a:bots:1090502150330781818> Bot id",
                    value: `${client.user.id}`,
                    inline: true,
                },
                {
                    name: "<:shards:1090502438118752278> Shards",
                    value: `\`${client.options.shardCount}\` shards`,
                    inline: true,
                },
                {
                    name: "<a:Owner:1086877613450072176> Bot owner",
                    value: `<@!781359764176896012> `,
                    inline: true,
                },
                {
                    name: "<:discordEmployee:1086877799035457536> Bot developer",
                    value: `<@!781359764176896012> <@!859331352334696468>`,
                    inline: true,
                },
                {
                    name: "<a:Computer:1090503129319079996> Commands",
                    value: `\`${client.commands.size}\` commands`,
                    inline: true,
                },
                {
                    name: "<a:globe:1090503309053415454> Servers",
                    value: `\`${totalGuilds}\` servers`,
                    inline: true,
                },
                {
                    name: "<a:globe:1090503309053415454> Servers this shard",
                    value: `\`${client.guilds.cache.size}\` servers`,
                    inline: true,
                },
                {
                    name: "<a:member:1090503505980166144> Members",
                    value: `\`${totalMembers}\` members`,
                    inline: true,
                },
                {
                    name: "<:voice:1086880064408391751> Connected channels",
                    value: `\`${totalVoice}\` channels`,
                    inline: true,
                },
                {
                    name: "<:channels:1090503931022544937> Channels",
                    value: `\`${totalChannels}\` channels`,
                    inline: true,
                },
                {
                    name: " <a:dots:1086876449773998140> Created",
                    value: `<t:${Math.round(client.user.createdTimestamp / 1000)}>`,
                    inline: true,
                },

                {
                    name: "_____ \n\n│System",
                    value: `_____`,
                    inline: false,
                },
                {
                    name: "<a:online:1086879452094537799> Uptime",
                    value: `${duration}`,
                    inline: true,
                },
                {
                    name: "<a:api_latency:1090516234635858042> API speed:",
                    value: `\`${client.ws.ping}\`ms`,
                    inline: true,
                },
                {
                    name: "<:version:1090516422943309916> Bot Version",
                    value: `\`${require(`${process.cwd()}/package.json`).version}\``,
                    inline: true,
                },
                {
                    name: "<a:nodejs:1090516729609859092>  Node.js Version",
                    value: `\`${process.version}\``,
                    inline: true,
                },
                {
                    name: " <:Verified_bot:1086879098170785812> Discord.js Version",
                    value: `\`${Discord.version}\``,
                    inline: true,
                },
                {
                    name: "<:RAM:1038408161129943121> Bot memory",
                    value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB`,
                    inline: true,
                },
                {
                    name: "<:giveaway:1088294821430566934> Links",
                    value: `Add me: [[HERE]](https://kysta.tech/kyasta/add) \nSupport server: [[HERE]](https://kysta.tech/support)`,
                    inline: false,
                }],
                type: 'editreply'
            }, interaction)
        })
}

 
