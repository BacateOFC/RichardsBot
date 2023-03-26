const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("This is used for the most admin features")
    .addSubcommand((x) =>
      x
        .setName("profile")
        .setDescription("This show the user profile inside or system")
        .addUserOption((y) =>
          y
            .setName("user")
            .setDescription(
              "If you leave here without a answer will show your profile"
            )
        )
    )
    .addSubcommand((x) => x.setName('pix-account').setDescription('Use this command to create a PIX account in our DB').addStringOption((x)=> x.setName('option').setDescription('define if the account will be general Server Acconunt ou a personal account').addChoices(
      {name: 'Personal', value: 'personal'},
      {name: 'General', value: 'general'}
    ))),
  run: async ({interaction}) => {
            
  },
};