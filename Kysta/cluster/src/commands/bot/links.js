const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.StringSelectMenuBuilder()
                .setCustomId('Bot-linkspanel')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: `Support server`,
                        description: `Join the suppport server`,
                        emoji: "❓",
                        value: "support-linkspanel",
                    },
                    {
                        label: `Invite Bot`,
                        description: `Invite Bot to your server`,
                        emoji: "📨",
                        value: "invite-linkspanel",
                    },
                    {
                        label: `Community Server`,
                        description: `Join the community server!`,
                        emoji: "🌍",
                        value: "community-linkspanel",
                    },
                    {
                        label: `Top.gg`,
                        description: `Show the top.gg link`,
                        emoji: "📃",
                        value: "top.gg-linkspanel",
                    },
                ]),
        );

    client.embed({
        title: `🔗・Links`,
        desc: `Get access to all Bot links! Choose the link you need in the menu below`,
        image: "https://kysta.tech/banner.png",
        components: [row],
        type: 'editreply'
    }, interaction)
}

 