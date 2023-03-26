const { EmbedBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')
const { client, sequelize } = require('../index')
const { ButtonBuilder } = require('@discordjs/builders')

client.on('interactionCreate', async(interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName === 'admin') {
            if (interaction.options.getSubcommand() === 'pix-account') {
                const opt = interaction.options.getString('option')
                if (opt === 'personal') {
                    const embed = new EmbedBuilder()
                        .setTitle(`Personal account settings for **${interaction.user.username}**`)
                        .setDescription(`React with the button below to start the configuration of your pix account`)
                        .setThumbnail(interaction.user.displayAvatarURL())
                        .setColor('#2b2d31')

                    const button = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('account-p')
                                .setLabel('Start Config')
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji('✏️')
                        )
                    
                    interaction.reply({content: `${interaction.user}`, embeds:[embed], components: [button]})
                } else if (opt === 'general') {
                    const embed = new EmbedBuilder()
                        .setTitle(`**General Server Account Settings**`)
                        .setDescription(`React with the button below to start the configuration of the server pix account`)
                        .setThumbnail(interaction.guild.iconURL())
                        .setColor('#2b2d31')

                    const button = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('account-g')
                                .setLabel('Start Config')
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji('✏️')
                        )
                    
                    interaction.reply({content: `${interaction.user}`, embeds:[embed], components: [button]})
                }
            }

        }
    }
})