const express = require("express");
const app = express();

app.use(express.json());

let reqnumber = {};

let errorcount=0;

app.use(function (req, res, next) {
    const userid = req.headers["useriid"];
    if (!userid) {
        return res.status(400).json({ msg: "useriid header is required" });
    }
    if (reqnumber[userid]) {
        reqnumber[userid] += 1;
        if (reqnumber[userid] > 5) {
            return res.status(400).json({ msg: "Rate limit reached" });
        } else {
            next();
        }
    } else {
        reqnumber[userid] = 1;
        next();
    }
});

app.get("/usersdata", function (req, res) {
    const userid = req.headers["useriid"];
    if (!userid) {
        return res.status(400).json({ msg: "useriid header is required" });
    }
    const counting = reqnumber[userid] ; // Default to 0 if userid not found
    res.status(200).json({ count:counting , msg: `errorcount is: ${errorcount}` });
});


app.use(function(err,res,req,next){
    res.status(400).send({})
    errorcount+=1;
})

app.listen(400, () => {
    console.log("Server running on port 4000");
});