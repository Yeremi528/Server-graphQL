const { PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const bcryptjs = require("bcryptjs")

require('dotenv').config({ path: '.env' });

const jwt = require('jsonwebtoken');


const resolvers = {
    Query:{
        hola: () => "hola",
        me: async(_, __, ctx) => {
                const user = await prisma.user.findUnique({
                    where:{
                        id: ctx.userId
                    }
                })
               return user
          },
    },
    Mutation:{
        signup: async(_,{input}) => {
            const {email,name,password,apellido} = input

            //Validar si el usuario ya existe
            const userValidator = await prisma.user.findUnique({
                where:{
                    email
                }
            })
            if(userValidator){
                throw new Error('Usuario ya existente')
            }
            const hashearClave = await bcryptjs.hash(password,10)

            const user = await prisma.user.create({
                data:{
                    name,
                    email,
                    apellido,
                    password:hashearClave
                }
            })
            return {
                userErrors:[],
                user
            }
        },
        singin : async(_,{input}) => {
    
            const {email,password} = input
            
            const userValidator = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if(!userValidator){
                throw new Error('Usuario no existente')
            }
            const passwordCorrecto = await bcryptjs.compare(password,userValidator.password)

            if(!passwordCorrecto){
                throw new Error('Clave ingresada no es correcta')
            }
            
            return {
                token: jwt.sign({ userId: userValidator.id }, process.env.SECRETA, {
                    expiresIn: 3600000,
                  }),
            
        

        }}
    
    },

}

module.exports = resolvers