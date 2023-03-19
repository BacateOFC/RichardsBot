const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Use this command to see all the functions i have'),
    run: async({client, interaction}) => {
        const embed = new EmbedBuilder()
            .setTitle(`${client.user.username}'s Help Page`)
            .setDescription('Commnd List:\n\n**Config:**\n\´/config <Subcommand>\´ - this command is used to define some important feautures of the bot\n\n**Info:**\n\´/help\´  used to disply this page\n\n**Moderation:**\n\´/admin <subcommand>\´ - Used to admin the bot DB content\n\´/announcement\´ - used to announce something')
            .setColor('#2b2d31')
            .setThumbnail(client.user.displayAvatarURL())

        await interaction.reply({content: `Hey <@${interaction.user.id}>`, embeds:[embed], ephemeral: true})
    }
}