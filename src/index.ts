import { Client } from "discord.js-selfbot-v13"
import { config } from "dotenv"

config()

const bot = new Client() // All partials are loaded automatically

bot.on("ready", async () => {
  console.log(`${bot.user?.username} is ready!`)
})

bot.on("messageCreate", async (mes) => {
  if (mes.author.id !== '679348712472051715') return
  const { content } = mes
  console.log(content)
})

bot.login(process.env.BOT_TOKEN)
