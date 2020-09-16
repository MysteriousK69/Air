const array = [{
    name: 'Brownie',
    description: 'Mmmmmm tastes so good. Don\'t eat too much or you\'ll be fat.',
    canUse: true,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 10,
    price: 30,
    run: async (bot, message, args) => {
        const brownieRandom = [
            'You ate a brownie, and the taste of the chocolate watered in your mouth.',
            'You choked on a brownie and almost died. Be careful!',
            'The brownie tasted great.'
        ];
        const yes = brownieRandom[Math.floor(Math.random() * brownieRandom.length)];
        message.channel.send(`${brownieRandom}`);
    }
}];

module.exports = array;