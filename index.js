const Discord = require("discord.js");
const tokenfile = require("./tokenfile");
const botconfig = require("./botconfig");

const bot = new Discord.Client();

bot.on("ready", async () => {
  console.log(`${bot.user.username} Is Now Online!`);

  bot.user.setActivity("Alpha 0.1 | *help", {type: "PLAYING"});

  //bot.user.setGame("Sedang Proses Pekerjaan!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  if(cmd === `${prefix}report`){

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send(":x: Couldn't find user.");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("『Reports』")
    .setColor("#db0860")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);

    let reportschannel = message.guild.channels.find(`name`, `log-zytec`);
    if(!reportschannel) return message.channel.send(":x: Couldn't find log-zytec channel.")


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed)

    //message.delete().catch(O_o=>{});

     return;
  }

  if(cmd === `${prefix}afk`){
    let afkuser = args.join(" ").slice(0);
 
     message.delete()
     message.guild.members.get(message.author.id).setNickname("『AFK』 " + message.author.username);
     message.channel.send("**『AFK』 » **" + `${message.author} ` + afkuser)
 
      return;
    }
 
    if(cmd === `${prefix}ban`){
      
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!bUser) return message.channel.send(":x: Can't find user!");
      let bReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(":x: No Can Do!");
      if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: That Person Can't be Banned!");
  
      let banEmbed = new Discord.RichEmbed()
      .setDescription("『Banned』")
      .setColor("#F70808")
      .addField("Banned User", `${bUser} with ID ${bUser.id}`)
      .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Banned in", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", bReason);
  
      let zyteclogchannel = message.guild.channels.find(`name`, "zyteclog");
      if(!zyteclogchannel) return message.channel.send(":x: Can't Find zyteclog channel.");
  
      message.delete()
      message.guild.member(bUser).ban(bReason);
      zyteclogchannel.send(banEmbed);

      return;
    }

    

    if(cmd === `${prefix}kick`){

      let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!kUser) return message.channel.send(":x: Can't find user!");
      let kReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: No Can Do!");
      if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: That Person Can't be Kicked!");
  
      let kickEmbed = new Discord.RichEmbed()
      .setDescription("『Kicked』")
      .setColor("#ff8114")
      .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
      .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Kicked in", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", kReason);
  
      let kickChannel = message.guild.channels.find(`name`, "zyteclog");
      if(!kickChannel) return message.channel.send(":x: Can't Find zyteclog channel.");
  
      message.guild.member(kUser).kick(kReason);
      kickChannel.send(kickEmbed);
  
      return;
    }

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
   .setDescription("『Server Information』")
   .setColor("#4706d3")
   .setThumbnail(sicon)
   .addField("「Server Name」", message.guild.name)
   .addField("「Created On」", message.guild.createdAt)
   .addField("「You Joined」", message.guild.joinedAt)
   .addField("「Total Members」", message.guild.memberCount);



    return message.channel.send(serverembed);
  }
  
  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.avatarURL;
    let botembed = new Discord.RichEmbed()
   .setDescription("『Bot Information』")
   .setColor("#24E509")
   .setThumbnail(bicon)
   .addField("「Bot Name」", bot.user.username)
   .addField("「Created On」", bot.user.createdAt)
   .addField("「Location」", "Indonesian")
   .addField("「Creator」", "⦅Zycster⦆#5182")
   .setFooter("WARNING!: This bot it still on Alpha testing. If you have any issue or suggestion please dm ⦅Zycster⦆#5182")



    return message.channel.send(botembed);
  }

});

bot.login(process.env.BOT_TOKEN);
