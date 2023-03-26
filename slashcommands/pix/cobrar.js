const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cobrar')
        .setDescription('Use this command to generate a charge (Only PIX - Brazilian instant payment system)'),

    run: async({interaction}) => {
        
    }
}