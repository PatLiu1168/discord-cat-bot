const Discord = require('discord.js');
const auth = require('./auth.json');
const { Client,Attachment } = require('discord.js');
const client = new Discord.Client();

var cheerio = require("cheerio");
var request = require("request");

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    let number = 0;
    let end = 0;  

    //Garbage Code for Friends
    if (msg.content.includes("emma") || msg.content.includes("Emma")) {
        msg.reply("hah GaY");
        number=1;
    }
    else if (msg.content.includes("simon") || msg.content.includes("Simon")){
        msg.reply("chickuwuen");
        number=2;
    }
    else if (msg.content.includes("sherry") || msg.content.includes("Sherry")){
        msg.reply("wow a baby");
        number=3;
    }
    else if (msg.content.includes("rose") || msg.content.includes("Rose")){
        msg.reply("<3");
        number=4;
    }
    else if (msg.content.includes("lucy") || msg.content.includes("Lucy")){
        msg.reply("give me your hair");
        number=5;
    }
    else if (msg.content.includes("norman") || msg.content.includes("Norman")){
        msg.reply("also GAAAY");
        number=6;
    }

    if (number != 0){
        msg.channel.send(" ", {
            files: [
                "Pictures/"+number+".jpg"
            ]
        });
        number = 0;
    }

    //Random Cat Search
    if (msg.content.includes("cat.")){
        end = msg.content.indexOf("cat.") + 3;

        while (msg.content.charAt(end) != '!'){
            end++;
        }

        let type = msg.content.slice(msg.content.indexOf("cat.")+4,end);

        let search = type + " cat";

        imageSearch(search, msg);
    }

});

client.login(auth.token);

function imageSearch(search, msg){
    msg.reply("Looking for " +search);
    
    let options = {
        //based off another source
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            //error
            msg.reply("No Cat");
            return;
        }
 
        $ = cheerio.load(responseBody); 
 
        //name of the css selector of image links - easier on dogpile than google
        let links = $(".image a.link");
 
        let results = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(results);
        if (!results.length) {
            //error - no search results
            msg.reply("No Cat");
            return;
        }
 
        msg.reply("Found a " +search);
        image=results[Math.floor(Math.random() * results.length)]
        msg.channel.send( image );
     });
}

