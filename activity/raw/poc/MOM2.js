// To get the man of the match serially for every match(The output will be same every time we run the code)
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
let request=require("request");
let cheerio=require("cheerio");
console.log("Before");
request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html);
    }
}
function extractHtml(html){
    let selTool=cheerio.load(html);
    let matchCard=selTool(".col-md-8.col-16");
    console.log(matchCard.length);
    let allLinks=[];
    for(let i=0;i<matchCard.length;i++){
        let cardBtns=selTool(matchCard[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let linkofMatch=selTool(cardBtns[2]).attr("href");
        let fullLink="https://www.espncricinfo.com"+linkofMatch;
        allLinks.push(fullLink);
        
    }
    serialPlayer(allLinks,0);
}
function serialPlayer(allLinks,n){
    if(n==allLinks.length){
        return;
    }
    request(allLinks[n],function (err,resp,html){
        if(err){
            console.log(err);
        }else{
            extractPlayer(html);
            serialPlayer(allLinks,n+1);
        }
    })
}

function extractPlayer(html){
    let selTool=cheerio.load(html);
    let playerDetails=selTool(".best-player-content").text();
    console.log(playerDetails);

}