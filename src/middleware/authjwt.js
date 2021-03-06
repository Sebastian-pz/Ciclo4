const jwt = require('jsonwebtoken');
const jwtClave = "Estanoeslaclave123"

const validateToken = (request, response, next) => {
    const token = request.headers['authorization']
    if(!token){
        return response.status(401).json({response:"No llegó el token"})
    }

    try {
        const profile = jwt.verify(token, jwtKey)
        if(profile){
            request.profile = profile.role
            next();
            return
        }
        return response.status(401).json({response:"Token invalido"})

    } catch(error) {
        return response.status(401).json({response:"Token invalido"})
    }
}

const admin = (request, response, next) => {
    if(request.profile == "Admin"){
        next();
    }
    return response.status(403).json({response:"Permisos insuficientes"})
}

const student = (request, response, next) => {
    if(request.profile == "Student"){
        next();
    }
    return response.status(403).json({response:"Permisos insuficientes"})
}


const isAdmin = (role) => {
    return role === 'Admin'
}
const isLeader = (role) => {
    return role === 'Leader'
}

module.exports = {
    validateToken,
    admin,
    student,
    isAdmin,
    isLeader
}