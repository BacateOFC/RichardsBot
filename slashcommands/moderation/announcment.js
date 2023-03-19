const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder} = require('discord.js')
const { sequelize } = require('../..')
const Sequelize = require('sequelize')
var numero = Math.floor(Math.random() * 10000) + 10000; 
var numeroAleatorio = numero.toString().substring(1);
const anr = sequelize.define('anr', {
    id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true
    },
    userId: Sequelize.STRING,
    channelId: Sequelize.STRING,
    everyone: Sequelize.STRING,
})
const {client} = require('../../index')

client.on("ready", () => {
    anr.sync()
})
client.anr = anr
module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('This command permits to you announce something in a channel')
        .addStringOption(x => x.setName('everyone').setDescription('If its true the bot will add at the top of the mention a @everyone').addChoices(
            {name: 'Yes', value: 'yes'},
            {name: 'No', value: 'no'}
        ).setRequired(true))
        .addChannelOption(x => x.setName('channel').setDescription('Defines in what channel the bot will announce').setRequired(true)),
    run: async({interaction}) => {
        const channel = interaction.options.getChannel('channel')
        const everyone = interaction.options.getString('everyone')
        var a
        if (everyone === 'yes') {
            a = "Will mention everyone"
        } else if (everyone === 'no') {
            a = "Will not mention everyone"
        }
        const embed = new EmbedBuilder()
            .setTitle('Announcement Sketck')
            .setDescription(`React with the button bellow to open the content editor and send the announcement\n\n**Pre defined config:**\n\nChannel: ${channel}\n**Mention:** ${a}\nId: ${numeroAleatorio}\n\n\nThanks for choose BacateDev`)
            .setColor("#2b2d31")
            .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('announce')
                    .setLabel('Create')
                    .setEmoji('🖌')
                    .setStyle(ButtonStyle.Success)
            )

        const reply = await interaction.reply({content: `Announcement process has started...`, embeds:[embed], components:[button]})

        try {
          const anrc = await anr.create({
            id: numeroAleatorio,
            userId: interaction.user.id,
            channelId: channel.id,
            everyone: everyone,
          });
        } catch (error) {
          if (error.name === "SequelizeUniqueConstraintError") {
            return interaction.channel.send("That Warn already exists.");
          }

          console.log(error);

          return interaction.channel.send(
            "Something went wrong with adding a warn."
          );
        }
        module.exports = { anr }
    }
}
