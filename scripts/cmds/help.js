const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 𝚂 𝙷 𝙾 𝙷 𝙰 𝙶 ]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "𝚂𝙷𝙾𝙷𝙰𝙶",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += ``; // replace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭─────❃『  ☟︎︎︎${category.toUpperCase()} 🐐 』`;

          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 2).map((item) => `☔︎${item}`);
            msg += `\n│${cmds.join(" ".repeat(Math.max(1, 5 - cmds.join("").length)))}`;
          }

          msg += `\n╰────────────✦`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n\n╭─────❃[𝙴𝙽𝙹𝙾𝚈]\n│>𝚃𝙾𝚃𝙰𝙻 𝙲𝙼𝙳𝚂: [${totalCommands}].\n│𝚃𝚈𝙿𝙴:[ ${prefix}𝙷𝙴𝙻𝙿 𝚃𝙾\n│<𝙲𝙼𝙳> 𝚃𝙾 𝙻𝙴𝙰𝚁𝙽 𝚃𝙷𝙴 𝚄𝚂𝙰𝙶𝙴.]\n╰────────────✦`;
      msg += ``;
      msg += `\n╭─────❃\n│ 🌟 | [ 𝙶𝙾𝙰𝚃𝙱𝙾𝚃🐐│𝙵𝙱:https://www.facebook.com/profile.php?id=/100005765346614\n╰────────────✦`; 

      const attachment = await axios.get("https://i.imgur.com/BG239h5.gif", { responseType: "stream" });

      await message.reply({
        body: msg,
        attachment: attachment.data,
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `╭── 𝐍𝐀𝐌𝐄 ────⭓
  │ ${configCommand.name}
  ├── 𝐈𝐧𝐟𝐨
  │ 𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: ${longDescription}
  │ Other names: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
  │ Other names in your group: Do not have
  │ 𝚅𝚎𝚛𝚜𝚒𝚘𝚗: ${configCommand.version || "1.0"}
  │ 𝚁𝚘𝚕𝚎: ${roleText}
  | 𝙿𝚛𝚎𝚏𝚒𝚡: ${prefix}
  │ 𝚃𝚒𝚖𝚎 𝚙𝚎𝚛 𝚌𝚘𝚖𝚖𝚊𝚗𝚍: ${configCommand.countDown || 1}s
  │ 𝙰𝚞𝚝𝚑𝚘𝚛: ${author}
  ├── 𝐔𝐬𝐚𝐠𝐞
  │ ${usage}
  ├──𝐍𝐨𝐭𝐞𝐬
  │ The content inside <XXXXX> can be changed
  │ The content inside [a|b|c] is a or b or c
  ╰━━━━━━━❖`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (EVERYONE)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
  }
