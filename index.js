const { Client, Message, MessageEmbed, Collection, GatewayIntentBits } = require('discord.js')
const fs = require('fs')
const Discord = require("discord.js")
const config = require('./config.json')
const prefix = config.prefix
const client = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});
const figlet = require('figlet');

figlet.text('Bacate Dev', function(error, data) {
  if (error) {
    console.log('Something went wrong...');
    console.dir(error);
    return;
  }
  console.log(data);
});

//DataBase Connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize('rbot', 'bot', '123456789', {
	host: 'localhost',
	dialect: 'mysql',
	logging: false,
});


module.exports = {
    client, 
    sequelize,
    prefix
}

const dotenv = require('dotenv')
const { announcement } = require('./events/announcement-modal')
const { anr } = require('./slashcommands/moderation/announcment')
const envFile = dotenv.config();
const token = process.env['token']
client.slashcommands = new Discord.Collection()

client.on("ready", () => {
    console.log(`${client.user.tag} is ready!`)
    client.warn.sync()
    announcement.sync()
    client.user.setStatus('online')  
});

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.Models = new Collection();

client.categories = fs.readdirSync('./commands');

['command'].forEach((handler) => {
    require(`./handler/${handler}`)(client)
});

['slashcommands'].forEach((handler) => {
    require(`./handler/${handler}`)(client)
});

['events'].forEach((handler) => {
    require(`./handler/${handler}`)(client)
});




client.login(token)
