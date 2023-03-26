const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonBuilder,
} = require("discord.js");
const { client, sequelize } = require("../index");
const { textSync } = require("figlet");
const { ActionRowBuilder } = require("@discordjs/builders");

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton) {
    if (interaction.customId === "account-p") {
      const form = new ModalBuilder()
        .setTitle("Personal Account Settings")
        .setCustomId("pix-ac-p");

      const chave = new TextInputBuilder()
        .setCustomId("chave")
        .setLabel("Chave PIX")
        .setPlaceholder("we ask you to not use CPF key")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const nome = new TextInputBuilder()
        .setCustomId("nome")
        .setLabel("Nome")
        .setPlaceholder("the same of your bank account")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const city = new TextInputBuilder()
        .setCustomId("city")
        .setLabel("City")
        .setPlaceholder("If you are brazilian do not use accents")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const acchave = new ActionRowBuilder().addComponents(chave);
      const acnome = new ActionRowBuilder().addComponents(nome);
      const accity = new ActionRowBuilder().addComponents(city);
      form.addComponents(acchave, acnome, accity);
      await interaction.showModal(form);
      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("account-p")
          .setDisabled(true)
          .setLabel("Start Config")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("✏️")
      );
      await interaction.message.edit({ components: button });
    } else if (interaction.customId === "account-g") {
      const form = new ModalBuilder()
        .setTitle("Server General Account Settings")
        .setCustomId("pix-ac-g");

      const chave = new TextInputBuilder()
        .setCustomId("chave")
        .setLabel("Chave PIX")
        .setPlaceholder("we ask you to not use CPF key")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const nome = new TextInputBuilder()
        .setCustomId("nome")
        .setLabel("Nome")
        .setPlaceholder("the same of your bank account")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const city = new TextInputBuilder()
        .setCustomId("city")
        .setLabel("City")
        .setPlaceholder("If you are brazilian do not use accents")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const acchave = new ActionRowBuilder().addComponents(chave);
      const acnome = new ActionRowBuilder().addComponents(nome);
      const accity = new ActionRowBuilder().addComponents(city);
      form.addComponents(acchave, acnome, accity);
      await interaction.showModal(form);
      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("account-g")
          .setDisabled(true)
          .setLabel("Start Config")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("✏️")
      );
      await interaction.message.edit({ components: button });
    }
  }
});
