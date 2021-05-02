// It is a deadlock condition
// We can't implement multiple files async using for loop(We have to use recursion)
let fs=require("fs");
let arr=["f1.txt","f2.txt","f3.txt","f4.txt"];
console.log("Before");
for(let i=0;i<arr.length;){
    console.log(i);
    fs.readFile(arr[i],function (err,data){
        if(err){
            console.log(err);
        }else{
            console.log("data-> "+data);
            i++;
        }
    })
}
console.log("After");