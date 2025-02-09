const Command = require("../../structures/Command");
const { MessageEmbed } = require("discord.js");
const { mem, cpu, os } = require("node-os-utils");
const { stripIndent } = require("common-tags");

const Guild = require("../../database/schemas/Guild");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "stats",
      aliases: ["s", "botinfo"],
      description: "Displays Kysta's Statistics",
      category: "Information",
      cooldown: 3,
    });
  }

  async run(message) {
    const guildDB = await Guild.findOne({
      guildId: message.guild.id,
    });
    const language = require(`../../data/language/${guildDB.language}.json`);
    let uptime = this.client.uptime;
    let seconds = uptime / 1000;
    let days = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    uptime = `${seconds}s`;
    if (days) {
      uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (hours) {
      uptime = `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes) {
      uptime = `${minutes}m ${seconds}s`;
    }

    let rss = process.memoryUsage().rss;
    if (rss instanceof Array) {
      rss = rss.reduce((sum, val) => sum + val, 0);
    }
    let heapUsed = process.memoryUsage().heapUsed;
    if (heapUsed instanceof Array) {
      heapUsed = heapUsed.reduce((sum, val) => sum + val, 0);
    }
    const { totalMemMb } = await mem.info();
    const serverStats = stripIndent`
      OS -- ${await os.oos()}
      CPU -- ${cpu.model()}
      Cores -- ${cpu.count()}
      CPU Usage -- ${await cpu.usage()} %
      RAM -- ${totalMemMb} MB
      RAM Usage -- ${(heapUsed / 1024 / 1024).toFixed(2)} MB
    `;
    const tech = stripIndent`
      Ping -- ${Math.round(message.client.ws.ping)}ms
      Uptime  -- ${uptime}
      ${language.KystaVersion} -- 2.0
      Library -- Discord.js v13.6.0
      Environment -- Node.js v16.9.1
      Servers -- ${message.client.guilds.cache.size}
      ${language.users} -- ${this.client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    )}
      ${language.channels} -- ${message.client.channels.cache.size}
      ${language.KystaCommands} -- ${message.client.botCommands.size}
      Aliases -- ${message.client.aliases.size}
    `;
    const devs = stripIndent`
     -------
     ${language.KystaOwners}
    •Frenzzy#1230
    • !..Aarush#8919
     ${language.KystaDevelopers}
    • SuckSome#0001
    • BossByte#7269
    • LeoX#0001
    -------
    `;
    const embed = new MessageEmbed()
      .setAuthor(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTitle(`Kysta Information`)
      .addField(`${language.pogyGeneral}`, `\`\`\`css\n${tech}\`\`\``, true)
      .addField(`${language.pogyTeam}`, `\`\`\`css\n${devs}\`\`\``, true)
      .addField(`${language.pogyStats}`, `\`\`\`css\n${serverStats}\`\`\``)
      .setFooter({ text: `https://Kysta.tech` })
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.sendCustom({ embeds: [embed] });
  }
};
