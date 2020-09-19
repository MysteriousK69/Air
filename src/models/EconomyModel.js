const mongoose = require('mongoose');

const EconomySchema = new mongoose.Schema({
    userId: { type: String, required: false },
    coinsInWallet: { type: Number, required: false, default: 0 },
    coinsInBank: { type: Number, required: false, default: 0 },
    bankSpace: { type: Number, required: false, default: 1000 },
    work: {
        job: { type: String, default: 'none' },
        moneyEarned: { type: String, default: 0 },
        cooldown: { type: Date, default: new Date(Date.now() - 3600000) },
    },
    items: { type: Array, required: false, default: [] },
    dailyStreak: { type: Date, required: false, default: new Date(Date.now() - 86400000) }
});

module.exports = mongoose.model('economy', EconomySchema);