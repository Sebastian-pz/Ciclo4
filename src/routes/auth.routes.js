const { Router } = require('express')
const singin = require('../controller/auth.controller')

const route = Router();

route.use((request,response,next)=>{

  //response.header()
next()
})

route.post('/login', singin)
module.exports = route