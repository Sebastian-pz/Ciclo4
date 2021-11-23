const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const aes256 = require('aes256');
const { encryptKey } = require('../service/user.service');


const jwtKey = "jwtKey";

const singin = async (request, response) => {
    try {
        const user = await User.findOne({email: request.body?.email})
        if(user) {
            const decryptPassword = aes256.decrypt(encryptKey, user.password)
            if(decryptPassword === request.body?.password){
                if(user.accountStatus === "Activa"){
                    const token = jwt.sign({
                        role: user.role
                    }, jwtKey, {expiresIn: 60*30})
                } else {
                    return response.status(400).json({response: "Aún no se encuentra autorizado"})
                }
            } else {
                return response.status(401).json({response:"Verifica la información"})
            }
        } else {
            return response.status(401).json({response:"Verifica la información"})
        }
    } catch (error) {
        console.log(error)
        reponse.status(500).json({response:"Contacte a la administración"})
    }
}


module.exports = singin;