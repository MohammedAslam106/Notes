const express=require('express')
const Users=require('../../Schemas/Users')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const routes=express.Router()

routes.post('/signup',async(req,res)=>{
    console.log('siging up')
    try{
        const body=req.body
        if (!body.name || !body.username || !body.password){
            res.status(401).json({message:'data is not sufficient to signup'})
            return
        }
        const hashPassword=bcrypt.hashSync(body.password,10)
        const newUser=await  Users.create({
            ...body,password:hashPassword
        })
        res.json({user:newUser})
    }
    catch(error){
        res.json({error:error.message})
    }
})

routes.post('/signin',async(req,res)=>{
    try{
        const body=req.body
        if(!body.username || !body.password){
            res.status(401).json({message:'username and password are required'})
            return
        }
        const beData=await Users.findOne({username:body.username})
        if(!beData){
            res.status(403).json({message:'user not found'})
            return
        }
        const compare=bcrypt.compareSync(body.password,beData.password)
        if(!compare){
            res.status(403).json({message:'wrong password'})
            return
        }
        const token=jwt.sign({...beData},"I Don't Know")
        res.json({token:token,user:beData})
    }
    catch(error){
        res.json({message:error.message || error})
    }
})

module.exports=routes