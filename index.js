const {ApolloServer} = require('apollo-server')

const resolvers = require('./database/resolvers')
const typeDefs =  require('./database/schema')

const getUserFromToken = require('./getUserFromToken')

const jwt = require("jsonwebtoken")

require('dotenv').config({ path: '.env' });

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const user = await getUserFromToken(req.headers.authorization)
        return user
    }
   
    
});

server.listen({port: process.env.PORT || 4000}).then(({url})        => {
    console.log(`Server corriendo en el puerto ${url}`)
})