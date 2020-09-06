const mongoose = require('mongoose');

const EconomySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    coinsInWallet: { type: Number, required: false, default: 0 },
    coinsInBank: { type: Number, required: false, default: 0 },
    bankSpace: { type: Number, required: false, default: 1000 },
    job: { type: String, required: false },
    items: { type: Array, required: false },
    dailyStreak: { type: Date, required: false, default: new Date() }
});

module.exports = mongoose.model('economy', EconomySchema);