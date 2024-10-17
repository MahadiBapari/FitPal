const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')


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

    //validatiion
    if (!email || !password) {
        throw Error('Please fill in all the fields')
      }
      if (!validator.isEmail(email)) {
        throw Error('Please enter a valid email')
      }
      if (!validator.isStrongPassword(password)) {
        throw Error('Please enter a password that includes uppercase letters, lowercase letters, numbers and signs for a strong password')
      }

    const exists = await this.findOne({email})

    if(exists){
        throw Error('Please use a different email as this email is already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password:hash})

    return user
}

// login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('Please fill in all the fields')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Invalid LogIn credentials')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Invalid LogIn credentials')
  }

  return user
}


module.exports = mongoose.model('User', userSchema)