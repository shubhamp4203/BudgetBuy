const JWT =require("jsonwebtoken");
require("dotenv").config()
const cookieParser = require("cookie-parser")

const JWTverify=async (req,res,next)=>{
    const token = req.headers.cookie.split("=")[1];
    console.log(token);
    console.log("NOT FOUND");
    if(!token){
        res.status(401).json({message:"no token found"});
    }
    else{
        try {
            const decode=JWT.verify(token, process.env.SECRET_KEY)
            req.authdata=decode;
            console.log(req.authdata);
            next();
        } catch(err) {
            res.status(400).json({message:"Token not verified"});
        }
    }
}
module.exports=JWTverify;