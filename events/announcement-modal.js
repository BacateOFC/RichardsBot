const Sequelize = require('sequelize');
const { client, sequelize} = require('../index')
const announcement = sequelize.define('announcements-r', {
    id: {
        type: Sequelize.STRING,
        unique: true,
            primaryKey: true

    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    author: Sequelize.STRING,

})
const { channel, everyone} = require('../slashcommands/moderation/announcment');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { ButtonBuilder } = require('@discordjs/builders');
module.exports = {announcement}
client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton) {
    if (interaction.customId === "announce") {
      const form = new ModalBuilder()
        .setCustomId("announcement")
        .setTitle("Announcement Editor");
      const q1 = new TextInputBuilder()
        .setCustomId("q1")
        .setLabel("Defines the title from the Announcement:")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const color = new TextInputBuilder()
        .setCustomId("color")
        .setLabel("Defines the color from embed:")
        .setPlaceholder("Use English color name or HEX Color Code")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const q2 = new TextInputBuilder()
        .setCustomId("q2")
        .setLabel("Type the announcement description:")
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph);

      const q1Ac = new ActionRowBuilder().addComponents(q1);
      const colorAc = new ActionRowBuilder().addComponents(color);
      const q2Ac = new ActionRowBuilder().addComponents(q2);

      form.addComponents(q1Ac, colorAc, q2Ac);
      const bedited = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("edited")
          .setLabel("Edit has started")
          .setDisabled(true)
          .setStyle(ButtonStyle.Success)
      );
      await interaction.message.edit({ components: [bedited] });
      await interaction.showModal(form);
    }
  }
});