const Discord = require('discord.js');

const Schema = require("../../database/models/blacklist");

module.exports = async (client, interaction, args) => {
    const word = interaction.options.getString('word');

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            if (!data.Words.includes(word)) {
                return client.errNormal({
                    error: ` <a:alert:1090218139112976444> That word doesn't exist in the database!`,
                    type: 'editreply'
                }, interaction);
            }

            const filtered = data.Words.filter((target) => target !== word);

            await Schema.findOneAndUpdate({ Guild: interaction.guild.id }, {
                Guild: interaction.guild.id,
                Words: filtered
            });

            client.succNormal({
                text: `  <a:verify:1086879826146762752>  Word is removed from the blacklist!`,
                fields: [
                    {
                        name: `💬┆Word`,
                        value: `${word}`
                    }
                ],
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({
                error: ` <a:alert:1090218139112976444>  This guild has not data!`,
                type: 'editreply'
            }, interaction);
        }
    })
}

 