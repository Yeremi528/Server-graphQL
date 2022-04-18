const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env' });

const getUserFromToken = (token) => {
    try{
        return jwt.verify(token,process.env.SECRETA) 
    }catch(err){
        console.log(token)
        console.log('Error al verificar el token',err)
    } 
}

module.exports = getUserFromToken