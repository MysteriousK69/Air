const itemss = require('../utils/items');

module.exports.run = async (bot, message, args) => {
    let user = await bot.fetchUser(message.author.id);
    if (!args.join(' ')) {
        return message.channel.send("you can't buy nothing lmao");
    }
    const item = itemss.find(x => x.name.toLowerCase() === args.join(' ').toString().toLowerCase());
    if (!item) {
        return message.channel.send("You can't buy an item that doesn't exist");
    }
    if (!item.canBuy) {
        return message.channel.send(":thinking: You can't buy this item");
    }
    if (item.price > user.coinsInWallet) {
        return message.channel.send("This is so sad, YOU'RE TOO POOR");
    }
    let founditem = user.items.find(x => x.name.toLowerCase() === item.name.toLowerCase());
    let array = [];
    array = user.items.filter(x => x.name !== item.name);
    if (founditem) {
        array.push({
            name: item.name,
            amount: founditem.amount + 1,
            description: item.description
        });
        user.items = array;
        await user.save();
    }
    else {
        user.items.push({
            name: item.name,
            amount: 1,
            description: item.description
        });
        await user.save();
    }
    user.coinsInWallet -= item.price;
    await user.save();
    message.channel.send(`You bought a **${item.name}**`);
}

module.exports.config = {
    name: 'buy', // Command Name
    description: 'mmmmm the shop', // Description
    usage: 'air buy <item>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 4 // Command Cooldown
}