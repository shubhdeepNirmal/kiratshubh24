const express= require("express");

const app=express();

app.use(express.json());

app.post("/health",function(req,res){
    const kidneys=req.body.kidneys;
    const kidneyLength= kidneys.length;

    res.send("your kidney length is :"+kidneyLength)
});

//global ctch

app.use(function(err,req,res,next){
    res.json({
        msg:"something went wrong"
    })
})



app.listen(3000);
