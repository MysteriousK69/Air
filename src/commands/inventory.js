const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const user = await bot.fetchUser(message.author.id);
    if (user.items.length < 1) {
        return message.channel.send('You have no items.');
    }
    const items = user.items.map(x => `**${x.name}** - ${x.amount.toLocaleString()}\n${x.description}`);
    const embed = new MessageEmbed()
        .setTitle(`${message.author.username}'s Inventory`)
        .setDescription(`${items.join('\n\n')}`)
        .setColor('RANDOM');
    message.channel.send(embed);
}

module.exports.config = {
    name: 'inventory', // Command Name
    description: 'Sends your inventory.', // Description
    usage: 'air inventory', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['inv'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown

}