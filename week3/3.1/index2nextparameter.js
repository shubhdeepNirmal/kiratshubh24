const express= require("express");

const app=express();



let number=0;

function calculatereq(req,res,next){
    number++;
    console.log(number);
    next();
}

 app.use(calculatereq);
 app.use(express.json())

app.post("/health-checkup",function(req,res){
   console.log(req.body);
});

app.get("/health-checkup2",function(req,res){
    res.json({
        "msg":"hi baby"
    })
});

app.listen(3000);