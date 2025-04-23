const express= require("express");
const app= express();
app.use(express.json())
app.listen(4000)

let countreq=0;

app.use(function(req,res,next){
    if(req.path!=="/requestcount")
    {countreq+=1;
    }
    next();
})

app.get('/user',function(req,res){
    res.status(200).json({msg:"user created"})
})

app.get('/requestcount',function(req,res){
    res.status(200).json({
        countreq
    })
})