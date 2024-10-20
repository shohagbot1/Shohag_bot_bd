const axios = require('axios');
let Romim,ApiReq, Response,download;
module.exports = {
  config: {
    name: "cupcutdl",
    version: "1.0.1",
    credits: "𝗥𝗼𝗺𝗶𝗺",
    cooldowns: 6,
    hasPermssion: 0,
    description:
      "𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝘃𝗶𝗱𝗲𝗼 𝗳𝗿𝗼𝗺 𝗖𝗮𝗽𝗖𝘂𝘁 ",
    category: "𝗖𝗮𝗽𝗖𝘂𝘁 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗩𝗶𝗱𝗲𝗼",
    commandCategory: "media",
    usages: "[video_link]",
    usePrefix: true,
    Prefix: true,
    dependencies: {
      axios: "",
      "fs-extra": "",
      path: "",
      tinyurl: "",
    },
  },
module.exports.onStart = async({args,api,event}) =>{
  Romim = args.join("");
  const {threadID, messageID} = event;
  try {
     ApiReq = await axios.get(`https://mostakim.onrender.com/cupcutdl?link=${Romim}`)
    Response = ApiReq.data;
    const {eurixmp4,title,like,description} = Response;
   download = await axios.get(eurixmp4,{responseType: 'stream'})
   api.sendMessage({body:`Your Link : ${Romim}\n title:CapCut Media like:${like}\ndescription:${description}`,attachment: download.data},threadID,messageID);
  } catch (error) {
    api.sendMessage(`${error.messafe}`,threadID,messageID)
  }
}
