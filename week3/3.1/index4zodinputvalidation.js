const express =require("express");
const zod = require("zod");
const app= express();

app.use(express.json());

function validateinput(obj){
    const schema =zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    })
    const response = schema.safeParse(obj);
    console.log(response);
    return response;

}

app.post("/login",function(req,res){
    const response = validateinput(req.body)
    if(!response.success){
        res.json({
            msg:"your inputs are invalid"
        })
        return;
    }
    res.json({
        msg:"sucess"
    });
});

app.listen(3000);
