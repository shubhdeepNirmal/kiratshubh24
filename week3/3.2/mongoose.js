//express
const express= require("express");
const app=express();
app.use(express.json());

//jwt tokenization
const jwt= require("jsonwebtoken")
const jwtpass= "123456";

//mongo connection
const mongoose= require("mongoose");
mongoose.connect("mongodb+srv://shubhdeepNirmal:cseshubhdeep0301@cluster0.ack6a.mongodb.net/NirmalDB1")
const User = mongoose.model('Users', { name: String, email:String, password:String });

//signup function
app.post("/signup",async function(req,res){
    const username=req.body.username;
    const password= req.body.password;
    const name=req.body.name;
     
    //const existingUser= await User.findOne({email:username});
    if(!(await userExists(username,password)).error){
        return res.status(400).send("username exists already")
    }
    const user= new User({
    name: name,
    email: username,
    password: password
  });

 await user.save();
 res.json({
    "msg": "user created"
 })
})

//exesting user check
async function userExists(username,password){
    const user= await User.findOne({email:username})
    if(!user){
        return {
           error:true, msg: "user deos not exist"
        }
    }
    else if(user && user.password!==password){
        return {
            error:true, msg: "invalid password"
        };
    }
    return {
        error: false,user
    };
}

//signin function
app.post("/signin",async function(req,res){
    const username= req.body.username;
    const password= req.body.password;
    
    const user= await userExists(username,password);
    if(user.error){
        return res.status(403).json({
            msg:user.msg
        });
    }
        var token = jwt.sign({username:username},jwtpass)
        return res.json({
            token,
        });     

})

//return on signin
app.get("/userHome",async function(req,res){
    const token= req.headers.authorization;

    try{
        const decoded=jwt.verify(token,jwtpass);
        const username=decoded.username;
        const user= await User.findOne({email:username});

        if(!user){
            return res.status(404).json({msg:"user not found"});
        }
        res.json(user);

    }
    catch(err){
        return res.status(500).json({msg:"token error"});
    }
})

app.listen(3000);