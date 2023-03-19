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
    ),
  run: async ({interaction}) => {
            
  },
};