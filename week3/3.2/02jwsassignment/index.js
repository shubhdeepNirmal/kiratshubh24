const express= require("express");
const app= express();

const z= require("zod");

const jwt= require("jsonwebtoken");
const jwtpassword="123456";

const mailvalid= z.string().email({msg:"NULL"}).min(5);
const passvalid=z.string({msg:"NULL"}).min(6);

function signjwt(username,password){
    const uresponse= mailvalid.safeParse(username);
    const presponse = passvalid.safeParse(password);
    if(!uresponse.success||!presponse.success){
        return null;
    }
    
    if(uresponse.success||presponse.success){
        const tokenid =jwt.sign({
            username
        },jwtpassword); 
    }
     return tokenid;
}

function decodejwt(tokenid){  
    const decoded =jwt.decode(tokenid);
    if(decoded){
        return true;
    }
    else{
        return false;
    }
}

function verifyjwt (token)
{
    const ans=true;
    try{
        jwt.verify(token,jwtpassword);
    }
    catch(e){
        ans=false;
    }
    return ans;
}
