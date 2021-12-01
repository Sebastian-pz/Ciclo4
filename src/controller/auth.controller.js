const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const aes256 = require('aes256');
const { encryptKey } = require('../service/user.service');


const jwtKey = "jwtKey";

const singin = async (request, response) => {
    try {
        const user = await User.findOne({email: request.body?.email})
        if(!user){
            return response.status(401).json({response: "Verifique el correo y la contraseña"})
        }

        const decryptPassword = aes256.decrypt(encryptKey, user.password)
        if(request.body?.password != decryptPassword){
            return response.status(401).json({response:"Verifique el correo y la contraseña"})
        }

        if(user.accountStatus != "Activa"){
            return response.status(401).json({response:"Su cuenta aún no se encuentra activa"})
        }

        const token = jwt.sign({
            id: user.id,
            role: user.role
        }, jwtKey, {expiresIn: 60*60*2})

        response.status(200).json({ jwt:token})


    } catch (error) {
        console.log(error)
        response.status(500).json({response:"Contacte a la administración"})
    }
}


module.exports = singin;