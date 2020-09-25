module.exports.run = async (bot, message, args) => {
    const userData = await bot.fetchUser(message.author.id);
    const enable = ['true','on','enable'];
    const disable = ['false','off','disable'];
    if (enable.includes(args[0].toString().toLowerCase())) {
        userData.passive=true;
        await userData.save();
        message.reply(`I have enabled your passive mode`);
    } else if (disable.includes(args[0].toString().toLowerCase())) {
        userData.passive=false;
        await userData.save();
        message.reply(`I have disabled your passive mode`);
    } else message.reply(`Dude that's not a valid option`);
}
module.exports.config = {
    name: 'passive', // Command Name
    description: 'Enable / Disable passive mode', // Description
    usage: 'air passive <on | off>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 200000 // Command Cooldown
}