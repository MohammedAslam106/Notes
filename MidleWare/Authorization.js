const jwt=require('jsonwebtoken')

const verifyJwt=(req,res,next)=>{
    const authorization=req.headers.authorization
    if(!authorization){
        res.status(403).json({message:'signin first'})
        return
    }
    const token=authorization.replace('Bearer ','').trim()
    jwt.verify(token,"I Don't Know",(error,user)=>{
        if(error){
            res.json({message:error})
            return
        }
        req.user=user._doc
        next()
    })
}

module.exports=verifyJwt