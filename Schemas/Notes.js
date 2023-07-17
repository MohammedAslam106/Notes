const mongoose=require('mongoose')

const notesSchema=new mongoose.Schema({
    title:{type:String,required:true,minLength:3},
    note:{type:String,required:true},
    createdBy:{type:mongoose.Types.ObjectId,ref:'User',required:true}
},
    {timestamps:true}
)

const Note=new mongoose.model('Note',notesSchema)

module.exports=Note;