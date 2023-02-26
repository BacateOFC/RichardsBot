const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {client, prefix} = require('../../index')
const { spawn } =  require('child_process')
const fs = require('fs')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Used to config the bot Parameters')
        .addSubcommand(x => x.setName('mute').setDescription('Defines de Role the bot uses to mute someone').addRoleOption(x => x.setName('role').setDescription('Select the role')))
        .addSubcommand(x => x.setName('link').setDescription('Defines the roles the allows someone to send a link without to be warned').addRoleOption(x => x.setName('role').setDescription('Select the role')))
        .addSubcommand(x => x.setName('prefix').setDescription('Defines the roles the allows someone to send a link without to be warned').addStringOption(x => x.setName('prefix').setDescription('define the bot prefix'))),
    run: async({interaction}) => {
        if (interaction.options.getSubcommand() === "mute") {
          const role = interaction.options.getRole("role");
          const id = role.id;
          const env = fs.readFileSync(".env", "utf8");
          const lines = env.split("\n");
          const updatedLines = lines.map((line) => {
            if (line.startsWith("muteroleid")) {
              return `muteroleid=${id}`;
            }
            return line;
          });
          fs.writeFileSync(".env", updatedLines.join("\n"));

          const embed1 = new EmbedBuilder()
            .setTitle("Please wait while we save the file!")
            .setDescription(`We are definig the mute role as: ${role}`)
            .setColor("Aqua");
          await interaction.reply({ embeds: [embed1] });
          const embed = new EmbedBuilder()
            .setTitle("The configurations was saved with sucess!")
            .setColor("Green");

          await interaction.channel.send({ embeds: [embed], ephemeral: true });
        } else if (interaction.options.getSubcommand() === "link") {
          const role = interaction.options.getRole("role");
          const id = role.id;
          const env = fs.readFileSync(".env", "utf8");
          const lines = env.split("\n");
          const updatedLines = lines.map((line) => {
            if (line.startsWith("allowed")) {
              return `allowed=${id}`;
            }
            return line;
          });
          fs.writeFileSync(".env", updatedLines.join("\n"));

          const embed1 = new EmbedBuilder()
            .setTitle("Please wait while we save the file!")
            .setDescription(
              `We are definig the allowed links role as: ${role}`
            )
            .setColor("Aqua");
          await interaction.reply({ embeds: [embed1] });
          const embed = new EmbedBuilder()
            .setTitle("The configurations was saved with sucess!")
            .setColor("Green");

          await interaction.channel.send({ embeds: [embed], ephemeral: true });
        } else if (interaction.options.getSubcommand() === "prefix") {
          const newprefix = interaction.options.getString("prefix");
          const fs = require("fs");
          let data = fs.readFileSync("config.json");
          let config = JSON.parse(data);
          config.prefix = newprefix;
          fs.writeFileSync("config.json", JSON.stringify(config));

          const embed1 = new EmbedBuilder()
            .setTitle("Please wait while we save the file!")
            .setDescription(
              `We are definig the bot prefix as: \`${newprefix}\``
            )
            .setColor("Aqua");
          await interaction.reply({ embeds: [embed1] });
          const embed = new EmbedBuilder()
            .setTitle("The configurations was saved with sucess!\n\nThe Bot will restart to apply the change!!!")
            .setColor("Green");

          await interaction.channel.send({ embeds: [embed], ephemeral: true });

          function restartBot() {
            console.log('Reiniciando bot...');
            const child = spawn(process.argv.shift(), process.argv, {
              cwd: process.cwd(),
              detached: true,
              stdio: 'inherit',
            });
            
            // Adiciona um ouvinte de eventos para enviar uma mensagem quando o bot estiver pronto
            child.on('exit', () => {
              console.log('Bot reiniciado com sucesso!');
              // Aqui você pode adicionar o código para enviar uma mensagem para o canal ou usuário apropriado.
            });
          
            process.exit();
          }
        
          
          // Adicione isso no final do comando que precisa reiniciar o bot
          restartBot();


        }


    }
    
}