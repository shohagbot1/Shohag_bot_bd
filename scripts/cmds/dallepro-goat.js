const axios = require('axios');
const baseApiUrl = async () => {
  const base = await axios.get(`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`);
  return base.data.api;
}; 
module.exports = {
  config: {
    name: "dallepro",
    aliases: ["bingpro", "create", "imagine"],
    version: "1.0",
    author: "Dipto",
    countDown: 15,
    role: 2,
    description: "Generate images by Unofficial Dalle3",
    category: "download",
    guide: { en: "{pn} prompt" }
  }, 
  onStart: async({ api, event, args }) => {
    const prompt = (event.messageReply?.body.split("dalle")[1] || args.join(" ")).trim();
    if (!prompt) return api.sendMessage("❌| Wrong Format. ✅ | Use: 17/18 years old boy/girl watching football match on TV with 'Dipto' and '69' written on the back of their dress, 4k", event.threadID, event.messageID);
    try {
       //const cookies = "cookies here (_U value)";
const cookies = ["1eBj1bGXN7cnnND4SLeSxnoSWWpPR1nmtFpbr_nE97XghxAs6uDnIwmusUWycBhMb8faF8dlBoswX9FCvjaT_THpzoySpS8_dJRVq39muxbga6zwW5EgyeVqSSk13SHOoPBGdLxZr-jfjZ9Uv2ENLxDWtTTuuVk41-J9LnYQfsf1qEJHgO9Pfv5d-znV9eAGx5-m9PRAIJqGvZsMp8ZLC-Q"];
const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];
      const wait = api.sendMessage("Plz Wait baby 😽", event.threadID);
      const response = await axios.get(`${await baseApiUrl()}/dalle?prompt=${prompt}&key=dipto008&cookies=${randomCookie}`);
const imageUrls = response.data.imgUrls || [];
      if (!imageUrls.length) return api.sendMessage("Empty response or no images generated.", event.threadID, event.messageID);
      const images = await Promise.all(imageUrls.map(url => axios.get(url, { responseType: 'stream' }).then(res => res.data)));
    api.unsendMessage(wait.messageID);
   api.sendMessage({ body: `✅ | Here's Your Generated Dallepro Photo 😘`, attachment: images }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage(`Generation failed!\nError: ${error.message}`, event.threadID, event.messageID);
    }
  }
}
