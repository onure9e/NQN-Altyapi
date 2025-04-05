// --------------------------------------------------- V A R I A B L E S -------------------------------------- \\
const {
  Client,
  GatewayIntentBits,
  Partials,
  WebhookClient,
} = require("discord.js");
const { TOKEN } = require("./config.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// --------------------------------------------------- L O G I N -------------------------------------- \\
client.login(TOKEN);

// --------------------------------------------------- H A N D L E R -------------------------------------- \\
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;

  let msg = message.content;

  // Yeni Kısım
  if (message.mentions.roles.first()) return;
  if (msg.includes("@everyone")) return;
  if (msg.includes("@here")) return;
  if (msg.includes("discord.gg")) return;

  let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g);
  if (!emojis) return;

  emojis.forEach((m) => {
    let emoji = client.emojis.cache.find((x) => x.name === m);
    if (!emoji) return;
    let temp = emoji.toString();
    if (new RegExp(temp, "g").test(msg)) {
      msg = msg.replace(new RegExp(temp, "g"), emoji.toString());
    } else {
      msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
    }
  });

  if (msg === message.content) return;

  let webhook = await message.channel.fetchWebhooks();
  webhook = webhook.find((x) => x.name === "Onurege Was Here");

  if (!webhook) {
    webhook = await message.channel.createWebhook({
      name: "Onurege Was Here",
      avatar: client.user.displayAvatarURL({ dynamic: true }),
    });
  }

  await message.delete().catch(() => {});
  await webhook
    .send({
      content: msg,
      username: message.member?.nickname || message.author.username,
      avatarURL: message.author.displayAvatarURL({ dynamic: true }),
    })
    .catch(() => {});
});

// --------------------------------------------------- R E A D Y -------------------------------------- \\
client.once("ready", () => {
  console.log("[--------------------- R E A D Y ---------------------]");
  client.user.setActivity("NQN Copy By Onurege");
});
