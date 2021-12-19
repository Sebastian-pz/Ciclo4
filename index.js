require('./db/dbConnect')

const typeDefs = require('./src/graphQL/typeDef');
const resolvers = require('./src/graphQL/resolver');
const authRoute = require('./src/routes/auth.routes');
const {validateToken, admin, student} = require('./src/middleware/authjwt')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { request } = require('express')

const jwt = require('jsonwebtoken')
const jwtClave = "Estanoeslaclave123"
const api = express();
const startServer = async () => {
    const apollo = new ApolloServer(
        {
            typeDefs,
            resolvers,
            context: ({req}) => {
                const token = req.headers.authorization;
                //console.log(token)
                if(token){
                    try{
                        const profile = jwt.verify(token, jwtClave)
                        if(profile){
                            role = profile.role
                            return {role}
                        }
                    } catch(error) {
                        console.log(error)
                    }
                    return {}
                }
            }
        });
    await apollo.start()
    apollo.applyMiddleware({ app: api })
    api.use(express.json())
    api.use('/api',authRoute)
    api.get('/api/dashboard/admin', [validateToken, admin], (request, response) => {
        response.json("Soy el dashboard de admin")
    })
    api.get('/api/dashboard/student', [validateToken, student], (request, response) => {
        response.json("Soy el dashboard de estudiante")
    })
  
  
    api.set('port', process.env.PORT || 3001);
    api.listen(api.get('port'), () => {
        console.log(`Server corriendo en el puerto ${api.get('port')}`)
    })

    api.get("/health-check", (req, resp) => {
        resp.json('ok')
    })
}
startServer()

module.exports = api;
