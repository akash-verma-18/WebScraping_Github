// 1. Go to github.com/topics page.
// 2. fetch topics name appearing at the top.
// 3. For every topic, get their repo links.

let request=require("request");
let cheerio=require("cheerio");
console.log("Before");
let url="https://github.com/topics";
request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractData(html);
    }
}
function extractData(html){
    let selTool=cheerio.load(html);
    let anchors = selTool(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0;i<anchors.length;i++){
        let link=selTool(anchors[i]).attr("href");
        let fullLink="https://github.com"+link;
        extractRepoData(fullLink);
    }
}
function extractRepoData(fullLink){ // next page
    request(fullLink,cb);
    function cb(error,response,html){
        if(error){
            console.log(error);
        }else{
            getRepoLinks(html);
        }
    }   
}
function getRepoLinks(html){ // get their repo links
    let selTool=cheerio.load(html);
    let topicElem=selTool(".h1-mktg");
    console.log(topicElem.text());
    let arr=selTool("a.text-bold");
    for(let i=0;i<8;i++){// First 8 repo links
        let link=selTool(arr[i]).attr("href");
        console.log(link);
    }
    console.log("-------------------------");
}
console.log("After");