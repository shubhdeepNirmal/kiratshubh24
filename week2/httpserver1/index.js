const express = require ("express");
const port= 3000
const bodyParser = require("body-parser")
const app= express();

app.use(bodyParser.json());
app.post('/conversations',(req,res)=>{
    console.log(req.headers)
    console.log(req.body);
    res.send({
        msg: "2+466=9"
    })
})


app.listen(port,()=>{
    console.log('listening on  port ${port}')
});