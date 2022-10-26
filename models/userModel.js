import mongoose  from "mongoose";
import bcrypt from 'bcrypt'
//bunu sonradan yapariuy hatalarir icin
import validator from 'validator'

const {Schema} = mongoose


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        validate:[validator.isAlphanumeric,'lapnumeric']
    },
      email:{
        type:String,
        required:[true,'arial isst required'],
        unique:true,
        validate:[validator.isEmail,'VALID IST EMAIL']
    },
    password:{
        type:String,
        required:true,
        minLenght:[4,'At least 4 chrackter']
    }
},{
    timestamps:true
}
)

userSchema.pre('save',function(next){
    const user = this
    bcrypt.hash(user.password,10 ,(err,hash)=>{
        user.password =hash
        next()
    })
})

const User =mongoose.model('User',userSchema)
export default User