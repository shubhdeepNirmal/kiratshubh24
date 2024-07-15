const express = require("express");

const app= express();

app.get("/health-check",function(req,res){

    const username=req.headers.username;
    const password=req.headers.password;
    const kidneyId=req.headers.kidneyId;

  if(!(usernaem==="shubh"&&password==='pass')){}

})