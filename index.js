// --------------------------------------------------- V A R I B L E S -------------------------------------- \\
var Discord = require('discord.js')
var client = new Discord.Client({
    disableMentions: ["@everyone","@here"]
})
var {TOKEN} = require('./config.js')
// --------------------------------------------------- L O G I N -------------------------------------- \\
client.login(TOKEN)
// --------------------------------------------------- H A N D L E R -------------------------------------- \\
client.on('message',async(message)=>{
    if(!message.guild && message.author.bot) return;
    var msg = message.content;
    if(msg.mentions.roles.first) return;
    if(msg.includes("@everyone")) return;
    if(msg.inculdes("@here"))return;
    if(msg.includes("discord.gg")) return;
    let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g)
  if (!emojis) return;
  emojis.forEach(m => {
    let emoji = client.emojis.cache.find(x => x.name === m)
    if (!emoji) return;
    let temp = emoji.toString()
    if (new RegExp(temp, "g").test(msg)) msg = msg.replace(new RegExp(temp, "g"), emoji.toString())
    else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
  })

  if (msg === message.content) return;

  let webhook = await message.channel.fetchWebhooks();
  webhook = webhook.find(x => x.name === "Onurege Was Here");

  if (!webhook) {
    webhook = await message.channel.createWebhook(`Onurege Was Here`, {
      avatar: client.user.displayAvatarURL({ dynamic: true })
    });
  }

  message.delete().catch(err => { })
  webhook.send(msg,{
    username: message.member.nickname ? message.member.nickname : message.author.username,
    avatarURL: message.author.displayAvatarURL({ dynamic: true })
  }).catch(err => { })




})
// --------------------------------------------------- R E A D Y -------------------------------------- \\
client.on('shardReady',async (shard)=>{
    await client.user.setActivity(`NQN Copy By Onurege • ${shard+1}/${client.shard.count}`)
    console.log("[--------------------- R E A D Y ---------------------]");
})
