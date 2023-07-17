const express=require('express')
const Notes=require('../../Schemas/Notes')

const routes=express.Router()

routes.post('/',async(req,res)=>{
    try{
        const body=req.body
        console.log(req.user._id)
        const newNote=await Notes.create({
            ...body,
            createdBy:req.user._id
        })
        res.json(newNote)
    }catch(error){
        res.json({message:error.message})
    }
})

routes.get('/',async(req,res)=>{
    try{
        const notes=await Notes.find({createdBy:req.user._id})
        res.json({notes:notes})
    }
    catch(error){
        res.json({message:error.message})
    }
})

routes.get('/:id',async(req,res)=>{
    try{const note =await Notes.findOne({_id:req.params.id})
    res.json({note:note})}
    catch(error){
        res.json({message:error})
    }
})

routes.put('/:id',async(req,res)=>{
    try{
        if(!req.body){
            res.status(403).json({error:'data is required to update the value'})
            return
        }
        console.log(req.body)
        const body=req.body
        const note=await Notes.updateOne({_id:req.params.id},
            {$set:body},{ runValidators: true })
        res.json({note:note})
    }
    catch(error){
        res.status(402).json({message:error.message})
    }
})

routes.delete('/:id',async(req,res)=>{
    try{
        const note=await Notes.deleteOne({_id:req.params.id})
        res.json({note:note})
    }
    catch(error){
        res.json({message:error})
    }
})

module.exports=routes