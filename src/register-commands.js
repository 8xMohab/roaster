require("dotenv").config()
const { REST, Routes } = require("discord.js");
const commands = [
  {
    name: "bm",
    description: "bms somebody you mention",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.APP_TOKEN);

(async () => {
  console.log("registering commands...");
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.PUBLIC_KEY,
        process.env.APP_ID
      ),
      { body: commands }
    );
    console.log("commands were register successfully");
  } catch (error) {
    console.log(error);
  }
})();
