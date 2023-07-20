const express=require('express')
const multer=require('multer')
const Images=require('../../Schemas/Images')
const fs=require('fs')
const routes=express.Router()
const path=require('path')
const verifyJwt = require('../../MidleWare/Authorization')



// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null, path.join(__dirname, '../../uploads'));
//     },
//     filename:(req,file,cb)=>{
//         cb(null,Date.now() + path.extname(file.originalname) )
//     }
// })

const storage=multer.memoryStorage()

const upload=multer({storage:storage})

routes.post('/',verifyJwt,upload.single('image'),async(req,res)=>{
    console.log(req.file)
    console.log(req.files)
    console.log(req.file.buffer.toString('base64')) //--->Do this if possible
    try{
        // console.log(fs.readFileSync(path.join('uploads/' + req.file.filename)))
        await Images.deleteMany({user:req.user._id})
        const obj = {
            img: {
                data:req.file.buffer,
                contentType: req.file.mimetype
            },
            user:req.user._id
        }
        const response=await Images.create(obj)
        res.json({message:response})
        console.log(response)
        
    }catch(error){
        res.status(403).json({error:error})
    }
})

routes.get('/:id', async(req, res) => {
    try{
        const response=await Images.findOne({user:req.params.id})
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': response.img.data.length
          });
          res.end(response.img.data);
    }
    catch(error){
        return 
    }
});


routes.delete('/',async(req,res)=>{
    try{
        const response=await Images.deleteOne({user:req.user._id})
        res.json(response)
    }catch(error){
        res.json({error:error})
    }
})
module.exports=routes