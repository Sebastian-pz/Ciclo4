require('./db/dbConnect')

const typeDefs = require('./src/graphQL/typeDef');
const resolvers = require('./src/graphQL/resolver');
const authRoute = require('./src/routes/auth.routes');
const {validateToken, admin, student} = require('./src/middleware/authjwt')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { request } = require('express')


const api = express();
const startServer = async () => {
    const apollo = new ApolloServer(
        {
            typeDefs,
            resolvers
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

    api.get("/health-check", (req, resp) => {
        resp.json('ok')
    })

    api.listen('3001', () => console.log('Server started'))
}
startServer()

module.exports = api;