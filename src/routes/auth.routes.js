const { Router } = require('express');
const singin = require('../controller/auth.controller')

const route = Router();
route.use((request, response, next) => {
    next()
})

route.post('/login', singin)

module.exports = route;