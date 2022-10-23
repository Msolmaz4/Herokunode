import mongoose from 'mongoose'

const con =()=>{
    mongoose.connect(process.env.DB_URI,{
        dbName:'lengs',
        useNewUrlParser:'true',
        useUnifiedTopology:'true'
    }).then(()=>{
        console.log('mongoooooooooo')
    })
    .catch((err)=>console.log(err))

}
export default con