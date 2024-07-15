function shubhfunc(){
    let p= new Promise(function(resolve){

        setTimeout(function(){
            resolve("hello world")},3000)
        });
   return p;
}

async function main(){

    let value = await shubhfunc();
    console.log(value, "hello world2");
    console.log("hello world1");
}

main();
console.log("post main");