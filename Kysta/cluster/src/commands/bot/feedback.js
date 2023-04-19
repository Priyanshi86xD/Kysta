const Discord = require('discord.js');

const webhookClient = new Discord.WebhookClient({
    id: "1090312259110191165",
    token: "EYBdhsXgiEhOtfu2jLRQJuz3pW9s6waPBgU2UhOL2iAMwAGbNXYS50RmIrL_wi8Wl9Am",
});

module.exports = async (client, interaction, args) => {
    const feedback = interaction.options.getString('feedback');

    const embed = new Discord.EmbedBuilder()
        .setTitle(`<:feedback:1090312661251670136> ・New feedback!`)
        .addFields(
            { name: "User", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
        )
        .setDescription(`${feedback}`)
        .setColor(client.config.colors.normal)
    webhookClient.send({
        username: 'Bot Feedback',
        embeds: [embed],
    });

    client.succNormal({ 
        text: `<a:verify:1086879826146762752> Feedback successfully sent to the developers`,
        type: 'editreply'
    }, interaction);
}

 