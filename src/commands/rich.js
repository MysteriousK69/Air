const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    let array = [];

    const members = message.guild.members.cache.filter(member => !member.user.bot);

    for(const member of members.array()) {
        const user = await bot.fetchUser(member.user.id);
        array.push({
            tag: bot.users.cache.get(member.user.id).tag ? bot.users.cache.get(member.user.id).tag : 'Unknown#0000',
            coins: user.coinsInWallet ? user.coinsInWallet : 0
        });
    }

    const emojis = [':first_place:', ':second_place:', ':third_place:'];

    array = array.filter(user => user.coins > 0);

    if (array.length < 1) {
        return message.channel.send('No rich people in this server lmao');
    }

    array = array.sort((a, b) => {
        return b.coins - a.coins
    });

    array = array.slice(0, 6);

    array = array.map((x, i) => `${emojis[i] || '🔹'} **${x.coins.toLocaleString()}** - ${x.tag}`);

    const embed = new MessageEmbed()
        .setAuthor(`Richest people in ${message.guild.name}`)
        .setDescription(`${array.join('\n')}`)
        .setColor('RANDOM')
        .setFooter('wish I had that much money');
    message.channel.send(embed);
}

module.exports.config = {
    name: 'rich', // Command Name
    description: 'Shows the richest people in your server.', // Description
    usage: 'air rich', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 10 // Command Cooldown
}
