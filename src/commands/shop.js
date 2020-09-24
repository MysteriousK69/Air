const { MessageEmbed } = require('discord.js');
const itemss = require('../utils/items');

module.exports.run = async (bot, message, args) => {
    if (!args.join(' ') || !isNaN(args.join(' '))) {
        let amount = 5 * parseInt(args[0]);
        let page;
        if (!args[0]) {
            amount = 5;
        }
        let items = bot.items.list().filter(x => x.canBuy === true);
        items = items.slice(amount - 5, amount);
        items = items.map(x => `**${x.name}** -- __${x.price.toLocaleString()} coins__\n${x.description}`);
        if (items.length <= 5) page = 1;
        else if (items.length <= 10) page = 2;
        else if (items.length <= 15) page = 3;
        else if (items.length <= 20) page = 4;
        const shopEmbed = new MessageEmbed()
            .setTitle('Air Shop')
            .setDescription(`${items.join('\n\n')}`)
            .setColor('RANDOM')
            .setFooter(`Page ${args[0] || 1} of ${page}`);
        message.channel.send(shopEmbed);
    } else {
        const item = itemss.find(x => x.name.toLowerCase() === args.join(' ').toString().toLowerCase());
        if (!item) {
            return message.channel.send("Can't send an item that doesn't exist lmao");
        }
        let e;
        if (!item.canBuy) e = 'Can\'t buy this item.';
        else {
            e = `**${item.price.toLocaleString()}** coins`
        }
        const embed = new MessageEmbed()
            .setTitle(item.name)
            .setDescription(`${item.description}\n\n**Price**: ${e}\n**Sell Amount**: **${item.sellAmount.toLocaleString()}** coins`)
            .setColor('RANDOM');
        message.channel.send(embed);
    }
}

module.exports.config = {
    name: 'shop', // Command Name
    description: 'Sends the shop.', // Description
    usage: 'air shop [item]', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['store'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}
