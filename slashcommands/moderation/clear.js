const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Used to clean a chat')
        .setDMPermission(false)
        .addIntegerOption(x => x.setName('messages').setDescription('The number of messages wil be deletes (Betewen 1 - 100 )').setMinValue(1).setMaxValue(100).setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    run: async({interaction}) => {

        const amount = interaction.options.getInteger('messages')
        const channel = interaction.channel;

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ content: 'You do not have permission to do that!', ephemeral: true})
        if (amount > 100 || amount < 1) return interaction.reply({ content: 'Please enter a number between 1 and 100'})
        if (!amount) return interaction.reply({content: 'please enter a amount number', ephemeral: true})

        await interaction.channel.bulkDelete(amount).catch(err => {
            return;
        })

        const embed = new EmbedBuilder()
            .setTitle('Deleted successfuly')
            .setDescription(`The channel ${channel} had ${amount} messages deleted`)
            .setColor('#2b2d31')

        await interaction.reply({embeds: [embed]}).catch(err => {
            return;
        })


    }
}