const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]) || message.member;
    const user = await bot.fetchUser(member.id);
    const embed = new MessageEmbed()
        .setTitle(`${member.user.username}'s Balance`)
        .setDescription(`**Wallet**: ${user.coinsInWallet.toLocaleString()}
        **Bank**: ${user.coinsInBank.toLocaleString()}/${user.bankSpace.toLocaleString()}
        **Total**: ${(user.coinsInWallet + user.coinsInBank).toLocaleString()}`)
        .setColor('RANDOM');
    message.channel.send(embed);
}

module.exports.config = {
    name: 'balance',
    description: 'Sends your balance.',
    usage: 'air balance',
    botPerms: [],
    userPerms: [],
    aliases: ['bal', 'bank'],
    bankSpace: 0,
    cooldown: 10
}