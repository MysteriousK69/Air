require('dotenv').config();
const { Collection } = require('discord.js');
const MongoClient = require('./utils/MongoClient');
const bot = new MongoClient();
// contribooshun
// me is paro in NodeJS
// C:
// dis bot sexy
bot.login(process.env.TOKEN);

bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();

require('./utils/handlers/command')(bot);
require('./utils/handlers/event')(bot);
