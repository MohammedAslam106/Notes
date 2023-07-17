const mongoose=require('mongoose')
const express=require('express')
const routes=require('./routes/api')
const cors=require('cors')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const MONGODB_SERVER=process.env.MONGODB_SERVER
const PORT=process.env.PORT
mongoose.connect(`${MONGODB_SERVER}/notes`).then((res)=>console.log('connected to mongodb server')).catch(res=>res.message)

app.use(cors())
app.use(express.json())
// app.set('views', './views');
// app.set("view engine", "ejs")

app.use('/api',routes)

app.listen(PORT ?? 3005,()=>{
    console.log(`listening on port ${PORT}`)
})