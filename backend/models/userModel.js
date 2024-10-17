const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    
 
})

//signup method
userSchema.statics.signup = async function (email, password){
    const exists = await this.findOne({email})

    if(exists){
        throw Error('Please use a different email as this email is already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password:hash})

    return user
}

module.exports = mongoose.model('User', userSchema)