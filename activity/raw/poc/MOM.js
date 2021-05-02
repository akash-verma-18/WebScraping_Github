// To get the man of the match randomly for every match
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
    for(let i=0;i<matchCard.length;i++){
        let cardBtns=selTool(matchCard[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let linkofMatch=selTool(cardBtns[2]).attr("href");
        let fullLink="https://www.espncricinfo.com"+linkofMatch;
        //console.log(fullLink);
        getPlayeroftheMatchName(fullLink);
    }
}
function getPlayeroftheMatchName(fullLink){
    request(fullLink,cb);
    function cb(err,res,html){
        if(err){
            console.log(err);
        }else{
            extractPlayer(html);
        }
    }
}
function extractPlayer(html){
    let selTool=cheerio.load(html);
    let playerDetails=selTool(".best-player-content").text();
    console.log(playerDetails);

}