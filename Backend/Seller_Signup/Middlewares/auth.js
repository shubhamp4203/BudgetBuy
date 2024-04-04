const JWT =require("jsonwebtoken");
require("dotenv").config()

const JWTverify=async (req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        res.status(401).json({message:"no token found"});
    }
    else{
        const decode=await JWT.verify(token,process.env.SECRET_KEY)
        req.authdata=decode;
        next();
    }
}
module.exports=JWTverify;