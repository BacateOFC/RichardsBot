const { } = require('discord.js')
const Sequelize = require('sequelize')
const { client, sequelize} = require('../index')
const pixaccounts = sequelize.define('pix-account', {
    id: {
        type: Sequelize.STRING,
        unique: true,
            primaryKey: true,
    },
    user: Sequelize.STRING,
    chave: Sequelize.STRING,
    nome: Sequelize.STRING,
    city: Sequelize.STRING

})
var numero = Math.floor(Math.random() * 10000) + 10000; 
var numeroAleatorio = numero.toString().substring(1);
client.on('interactionCreate', async(interaction))