const express=require('express')
const routes=express.Router()
const noteRoute=require('./Notes')
const authRoute=require('./Auth')
const imageRoute=require('./Images')
const verifyJwt=require('../../MidleWare/Authorization')

routes.use('/auth',authRoute)
routes.use('/images',imageRoute)
routes.use(verifyJwt)
routes.use('/notes',noteRoute)

module.exports=routes