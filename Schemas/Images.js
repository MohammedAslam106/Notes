const mongoose=require('mongoose')

const ImagesSchema=new mongoose.Schema({
    img:{
        data:Buffer,
        contentType:String
    },
    user:{type:mongoose.Types.ObjectId,ref:'User',required:true}
})

const Image=new mongoose.model('Image',ImagesSchema)

module.exports=Image