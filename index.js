require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const { gifs, images } = require("./src/assets/gifs");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`COCO COOOOOOOO COOOOOOOO -${c.user.username}, ready boss`);
});

// client.on("messageCreate", (msg) => {
//   if (msg.content === gifs[0]) {
//     for (let i = 0; i < 2; i++) {
//       msg.reply(`${gifs[0]}`);
//     }
//     msg.reply(`done`);
//     return;
//   }
// });

// BM command
client.on("interactionCreate", async (inter) => {
  const member = inter.options.getMember("someone");
  if (!inter.isChatInputCommand()) return;
  if (inter.commandName === "bm") {
    await inter.reply(gifs[0]);
    for (let i = 0; i < 9; i++) {
      await inter.followUp(`${gifs[0]} ${member}`);
    }
    inter.followUp("Job done boss");
  }
});

// Roll command
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "roll") {
    try {
      const author = interaction.user;
      const roll = Math.floor(Math.random() * 6) + 1;
      const message = `You rolled a ${roll}!`;
      await interaction.reply(`${message} ${author}`);
      if (roll > 3) {
        await interaction.followUp(`Lucky bugger!! you're safe... for now`);
        await interaction.followUp(gifs[2]);
      }
      // Secret function that sends a message to the player's DM after 2 minutes
      if (roll <= 3) {
        setTimeout(async () => {
          const dmChannel = await author.createDM();
          await dmChannel.send(gifs[1]);
          await dmChannel.send(images[0]);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

client.login(process.env.APP_TOKEN);
