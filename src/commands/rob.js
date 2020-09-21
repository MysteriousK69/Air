module.exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args.join(' ')) || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(' ').toString().toLowerCase());
    if (!member) {
        return message.channel.send("You think you can rob nobody?");
    }
    const user = await bot.fetchUser(message.author.id);
    const robbedUser = await bot.fetchUser(member.id);
    if (robbedUser.coinsInWallet < 201) {
        return message.channel.send("This user doesn't have much coins, I wouldn't rob them");
    }
    const random = Math.floor(Math.random() * 5);
    if (random === 3) {
        return message.channel.send(`You tried to rob **${member.user.tag}** but got caught! Better luck next time.`);
    }
    let array = robbedUser.items.filter(x => x.name !== 'Wallet Lock');
    const walletLock = robbedUser.items.find(x => x.name === 'Wallet Lock');
    if (walletLock) {
        message.channel.send(`You tried to rob **${member.user.tag}**, but they had a **Wallet Lock**. Try again next time.`);
        if (walletLock.amount === 1) {
            robbedUser.items = array;
            await robbedUser.save();
            return;
        }
        else {
            array.push({
                name: 'Wallet Lock',
                amount: walletLock.amount - 1,
                description: walletLock.description
            });
            robbedUser.items = array;
            await robbedUser.save();   
            return;
        }
    }
    const randomAmount = Math.round(Math.random() * robbedUser.coinsInWallet);
    user.coinsInWallet += randomAmount;
    robbedUser.coinsInWallet -= randomAmount;
    await user.save();
    await robbedUser.save();
    message.channel.send(`:moneybag: You stole **${randomAmount.toLocaleString()}** coins from ${member}!`);
}

module.exports.config = {
    name: 'rob', // Command Name
    description: 'steal someones money and get rich', // Description
    usage: 'air rob <user>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 300 // Command Cooldown
}