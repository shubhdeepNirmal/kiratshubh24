 const express =require("express");
 const app = express();

 const users =[{
    name: "shubh",
    kidneys: [{
        healthy: false
    }]
 }];
  
 app.use(express.json());

 app.get("/",function(req,res){
    const shubhkidneys = users[0].kidneys;
    console.log(shubhkidneys)
    const numberkid= shubhkidneys.length;
   // let numberkidhealthy= //( use filter)

   //alternate using loop
   let healthykidneys =0
   for(let i=0;i<numberkid;i++){
       if(shubhkidneys[i].healthy){
        healthykidneys++;
       }
   }

   const unhealthykidneys = numberkid- healthykidneys;

   res.json({
    shubhkidneys,
    numberkid,
    healthykidneys,
    unhealthykidneys
   })

 })


  
 app.post("/",function(req,res){

    const ishealthy=req.body.ishealthy;
    users[0].kidneys.push({
        healthy: ishealthy
    })
    res.json({
        msg: "done"
    })
 })

 app.put("/",function(req,res){
   for(let i=0 ;i< users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;
    }
    res.json({});
 })

 app.delete("/",function(req,res){
    if(atleastonebad()){
        const newkidneys=[];
    for(let i=0;i<users[0].kidneys.length;i++){
       if(users[0].kidneys[i].healthy) newkidneys.push({
            healthy:true
        })
    }
    users[0].kidneys=newkidneys;
    res.json({msg: "done"})
    }
    else{
        res.status(411).json({
            msg: "no bad kidney"

        });
    }
    
    
 })

  function atleastonebad(){
    let atleastonebad =false;
    for( let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atleastonebad=true;
        }
    }
    return atleastonebad;
  }

 app.listen(3000);