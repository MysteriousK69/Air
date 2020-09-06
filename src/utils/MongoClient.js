require('dotenv').config();
const { Client } = require('discord.js');
const mongoose = require('mongoose');
const economy = require('../models/EconomyModel');

class MongoClient extends Client {
    constructor() {
        super();
        mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    /**
     * 
     * @param {string} userId - A discord user ID.
     */

    async fetchUser(userId) {
        const user = await economy.findOne({ userId: userId });
        if (!user) {
            const newUser = new economy({
                userId: userId,
                job: 'none',
                items: []
            });
            newUser.save();
            return newUser;
        }
        return user;
    }

    /**
     * 
     * @param {string} userId - A discord user ID.
     * @param {number} amount - Amount of bank space to give.
     */

    async giveBankSpace(userId, amount) {
        let user = await economy.findOne({ userId: userId });
        if (!user) {
            const newUser = new economy({
                userId: userId,
                job: 'none',
                items: []
            });
            newUser.save();
            return newUser;
        }
        user.bankSpace += parseInt(amount);
        await user.save();
        return user;
    }

    /**
     * 
     * @param {string} userId - A discord user ID.
     */

    async createUser(userId) {
        const user = await economy.findOne({ userId: userId });
        if (!user) return false;
        const newUser = new economy({
            userId: userId,
            job: 'none',
            items: []
        });
        newUser.save();
        return newUser;
    }
}

module.exports = MongoClient;