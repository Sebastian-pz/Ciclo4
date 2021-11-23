require('./db/dbConnect')

const typeDefs = require('./src/graphQL/typeDef');
const resolvers = require('./src/graphQL/resolver');
const authRoute = require('./src/routes/auth.routes');

const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const startServer = async () => {
    const api = express();
    const apollo = new ApolloServer(
        {
            typeDefs,
            resolvers
        });
    await apollo.start()
    apollo.applyMiddleware({ app: api })
    api.use(express.json())
    api.use('/api',authRoute)
    api.listen('3000', () => console.log('Server started'))
}
startServer()