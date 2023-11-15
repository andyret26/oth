const disc = require("discord.js")
const express = require('express')
require('dotenv').config()
const port = 3000
const app = express()
app.use(express.json())
const client = new disc.Client({
  intents: [
    disc.GatewayIntentBits.Guilds,
    disc.GatewayIntentBits.GuildMessages,
    disc.GatewayIntentBits.GuildMessageTyping,
    disc.GatewayIntentBits.MessageContent,
  ],
})
client.login(process.env.TOKEN)


app.get('/notify', (req, res) => {
  if(req.body.username === undefined || req.body.id === undefined){
    res.status(422).send("WRONG BODY")
    return
  }

  const channel = client.channels.cache.get("1173892318244376596")
  console.log(req.body)
  channel.send(`User Registered with id: ${req.body.id}, username: ${req.body.username}, `)
  res.status(200).send("OK")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})