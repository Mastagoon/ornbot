import { Client } from "discord.js-selfbot-v13"
import { config } from "dotenv"
import { OpenAI } from "openai";

config()

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? ""
const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

const bot = new Client() // All partials are loaded automatically

bot.on("ready", async () => {
  console.log(`${bot.user?.username} is ready!`)
})

bot.on("messageCreate", async (mes) => {
  if (mes.author.id !== '679348712472051715') return
  if (mes.mentions.users.has(bot.user!.id)) {
    if (mes.content.length < 10) return
    // const prompt = getAiPrompt(mes.content)
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: mes.content }
      ]
    })

    console.log(completion)
    mes.reply(completion.choices[0].message.content ?? "nope.")

  }
})

bot.login(process.env.BOT_TOKEN)

// const getAiPrompt = (text: string) => {
//   return `You are the Game Master of a the heavily customized RO private server: Project return to morroc.
//   A player is giving you feedback, saying: 
// ${text}
// reply to the player's feedback in a respectful manner, but without really confirming or denying that you will change anything.
// `;
// }

const systemMessage = `You are the Game Master of a the heavily customized RO private server: Project return to morroc. Your name is Orn
  Your job is to address players feedback in a respectful manner, but without definitely confirming or denying that you will change anything`
