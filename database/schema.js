const {gql} = require('apollo-server')

const typeDefs = gql`
    type Query{
        hola:String
        me:User
        
    }
    type Mutation {
        signup(input:NuevoUsuario):AuthPayload
        singin(input:Credentials):Token
    }
    input NuevoUsuario {
        name:String
        apellido:String
        email:String
        password:String
        
    }
    input Credentials {
        email:String!
        password:String!
    }
    type AuthPayload {
        userErrors: [UserErrors!]!
        user:User
    }
    type UserErrors {
        message:String
    }
    type User {
        id: ID!
        name:String!
        apellido:String!
        email:String!
        password:String!
        
    }
    type Token {
        token:String!
    
    }`

module.exports = typeDefs