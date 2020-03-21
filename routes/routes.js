const router = require("express").Router();

router.route("/login").get(async(req,res)=>{
    try{
        console.log("login done");
        res.send("<h1>HOLALLALA</h1>")
        
    }catch(err){
        console.log(err);       
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;