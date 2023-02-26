const { channel } = require('diagnostics_channel');
const { EmbedBuilder } = require('discord.js');
const Sequelize = require('sequelize');
const {client, sequelize} = require('../index')
const urlRegex = /\bhttps?:\/\/\S+/gi;
const week = 10
const Warn = sequelize.define('warns', {
	id: {
		type: Sequelize.STRING,
		unique: true,
        primaryKey: true,
	},
	reason: Sequelize.TEXT,
	username: Sequelize.STRING,
	warns: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});
client.warn = Warn

client.on('messageCreate', async(message) => {
    if (urlRegex.test(message.content)) {
        const id = message.author.id
        const reason = 'Tried to send a Message with a **Link** without authorization'
        const username = message.author.username

        const tag = await Warn.findOne({ where: { username: username } });
        if (tag) {
            if (tag.warns >= '3') {
              await message.delete()
              const muteid = process.env["muteroleid"];
              const mute = message.guild.roles.cache.get(muteid);
              await message.member.roles.add(mute);

              const now = new Date();
              const oneWeekFromNow = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
              const end = oneWeekFromNow.toLocaleDateString('en-US')

              const embed = new EmbedBuilder()
                .setTitle('A user has been punished')
                .setDescription(`**User:** <@${message.author.id}>\n**Reason:** Warn Limit exceeded\n**Duration:** 1 WEEK\n**Ends In:** ${end} `)
                .setColor('Red')
                
              await message.channel.send({
                content: `<@${id}>`,
                embeds: [embed],
              })

              setTimeout(() => {
                message.member.roles.remove(mute);
                tag.update({warns: 0})
                const embed2 = new EmbedBuilder()
                    .setTitle('A punishment has ended!')
                    .setDescription(`<@${message.author.id}> your punishemnt has ended and now your warns was defined to \`0\`, be careful and pay attention to your messages so you don't get muted again`)
                    .setColor('Green')
                message.channel.send({
                    content: `<@${id}>`,
                    embeds: [embed2],
                  })
              }, week * 1000);
            } else {
              await tag.increment("warns");
              await message.delete();
              const tw = tag.warns
              const warns = tw + 1
              const embed = new EmbedBuilder()
                .setTitle(`${username} was Warned`)
                .setDescription(
                  `**Reason:** ${reason}\n**Total Warns:** \`${warns}/3\``
                )
                .setThumbnail(message.author.avatarURL())
                .setColor("Green");
              await message.channel.send({
                content: `<@${id}>`,
                embeds: [embed],
              });
              return false;
            }
        } else {
          try {
            const warn = await Warn.create({
              id: id,
              reason: reason,
              username: username,
              warns: 1,
            });
            await message.delete();
            const embed = new EmbedBuilder()
              .setTitle(`${username} was Warned`)
              .setDescription(`**Reason:** ${reason}`)
              .setThumbnail(message.author.avatarURL())
              .setColor("Green");
            await message.channel.send({
              content: `<@${id}>`,
              embeds: [embed],
            });
          } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
              return message.channel.send("That Warn already exists.");
            }

            console.log(error);

            return message.channel.send(
              "Something went wrong with adding a warn."
            );
          }
        }
    }
})