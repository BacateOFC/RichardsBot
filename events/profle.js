const { EmbedBuilder } = require('discord.js')
const { client, sequelize} = require('../index')
const { announcement } = require('./announcement-modal')

client.on('interactionCreate', async(interaction) => {
    if (interaction.isCommand) {
        if (interaction.commandName === 'admin') {
            if (interaction.options.getSubcommand() === 'profile') {
                await interaction.deferReply()
                const user = interaction.options.getUser('user')
                if (user) {
                    const id = user.id
                    const profile = await announcement.findAll({ where: {author: id}})
                    const plist = profile.map(t => `Title: ${t.title} - ID: ${t.id}`).join('\n ')
                    const embed = new EmbedBuilder()
                        .setTitle(`${user.username}'s profile`)
                        .setDescription(`UserName: ${user.username}\nUser Id: ${user.id}\nAnnouncements:\n ${plist}\n\n *To see the announcement information use \`/admin announce <Announce ID>\``)
                        .setThumbnail(user.displayAvatarURL())
                        .setColor('#2b2d31')
                    
                    await interaction.editReply({embeds:[embed]})
                } else if (!user) {
                    const id = interaction.user.id
                    const us = interaction.user
                    const profile = await announcement.findAll({ where: {author: id}})
                    const plist = profile.map(t => `Title: ${t.title} - ID: ${t.id}`).join('\n ')
                    const embed = new EmbedBuilder()
                        .setTitle(`${us.username}'s profile`)
                        .setDescription(`UserName: ${us.username}\nUser Id: ${us.id}\nAnnouncements:\n ${plist}\n\n *To see the announcement information use \`/admin announce <Announce ID>\``)
                        .setThumbnail(us.displayAvatarURL())
                        .setColor('#2b2d31')

                    
                    
                    await interaction.editReply({embeds:[embed]})
                }

            }
        }
    }
})