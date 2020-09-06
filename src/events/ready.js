module.exports = bot => {
    bot.user.setActivity('air help', { type: 'PLAYING' });
    console.log(`${bot.user.tag} is online.`);
}