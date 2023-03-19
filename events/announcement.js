const { client, sequelize} = require('../index')
const { EmbedBuilder } = require('discord.js')
const { announcement } = require('./announcement-modal')
const { anr } = require('../slashcommands/moderation/announcment')



client.on('interactionCreate', async(interaction) => {
    if (interaction.isModalSubmit) {
        if (interaction.customId === 'announcement') {
            const msgId = interaction.message.id
            const title = interaction.fields.getTextInputValue('q1')
            const color = interaction.fields.getTextInputValue('color')
            const description = interaction.fields.getTextInputValue('q2')
            var numero = Math.floor(Math.random() * 10000) + 10000; 
            var numeroAleatorio = numero.toString().substring(1);
            const an = await client.anr.findOne({ where: {userId: interaction.user.id}})
            var channelId = 'Não Existe'
            var everyone = 'Não existe'
            if (an) {
                channelId = an.channelId;
                everyone = an.everyone;
            }
            const channel = client.channels.cache.get(channelId)
            
            const embed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setColor(color)
                .setFooter({text: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            if (everyone === 'yes') {
                await channel.send({content: `<@everyone>`, embeds:[embed]})
            } else if (everyone === 'no') {
                await channel.send({embeds:[embed]})
            }

            const deleteR = await client.anr.destroy({ where: {userId: interaction.user.id}})
            if (!deleteR) return interaction.channel.send('Não foi encontrado nenhum registro para esse usuario')
            try {
                const ann = await announcement.create({
                    id: numeroAleatorio,
                    title: title,
                    description: description,
                    author: interaction.user.id,
                })
                const emb = new EmbedBuilder()
                    .setTitle('We have saved you announcemnt')
                    .setDescription(`Announcemnt informations:\n\nChannel: ${channel}\nTitle: **${title}**\nId: ||${numeroAleatorio}||`)
                    .setColor('#2b2d31')
                    .setFooter({text: 'Bacate Development', iconURL: client.user.displayAvatarURL()})
                
                await interaction.user.send({embeds:[emb]})
                await interaction.reply({content: 'You have announced successfully!', ephemeral: true})
                                
            } catch (error) {
                if (error.name === "SequelizeUniqueConstraintError") {
                    return message.channel.send("That Warn already exists.");
                  }
      
                  console.log(error);
      
                  return interaction.channel.send(
                    "Something went wrong with adding a warn."
                  );
                
            }
        }
    }
})
