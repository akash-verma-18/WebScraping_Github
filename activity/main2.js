// Extension of main.js
// Now make a folder for every topic and then put  json files of the repo links

let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let path=require("path");
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
    let topicName=topicElem.text().trim();
    dirCreator(topicName);
    let arr=selTool("a.text-bold");
    for(let i=0;i<8;i++){// First 8 repo links
        let repoPageLink=selTool(arr[i]).attr("href");
        let repoName=repoPageLink.split('/').pop();
        createFile(repoName,topicName); // we have to create repo name in topic name
    }
    console.log("-------------------------");
}
function dirCreator(topicName){
    let pathofFolder=path.join(__dirname,topicName);
    if(fs.existsSync(pathofFolder)==false){ // to check whether foldername exists or not
        fs.mkdirSync(pathofFolder);
    }
}
function createFile(repoName,topicName){
    let pathofFile=path.join(__dirname,topicName,repoName+".json");
    if(fs.existsSync(pathofFile)==false){ // if file doesn't exist
        let createStream=fs.createWriteStream(pathofFile); // to create new file
        createStream.end();
    }
}
console.log("After");