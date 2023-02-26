const {client, sequelize} = require('../index');


client.on('interactionCreate', interaction => {
  async function handleCommand() {
    if (!interaction.isCommand()) return;

    const slashcmd = client.slashcommands.get(interaction.commandName);
    if (!slashcmd) interaction.reply('Não é um comando válido');

    // Remova a chamada ao método deferReply
    await slashcmd.run({ client, interaction });
  }
  handleCommand();
});



let commands = []