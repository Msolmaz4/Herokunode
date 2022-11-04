import express from 'express'
import pageRouter from './routes/pageRouter.js'
import photoRouter from './routes/photoRouter.js'
import userRouter from './routes/userRouter.js'
import cookieParser from 'cookie-parser'
import {checkUser} from './middlerwares/authMiddleware.js'
import methodOverride from 'method-override'

//bunu bilgisatrdan yyuklerken name ulasmasi icn 
import fileUpload from 'express-fileupload'
//bunu depolamak icin kullaniriz
import {v2 as cloudinary} from 'cloudinary'

import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET


})


import con from './db.js'
//
con()



const app =express()
const port = process.env.PORT;


//ejs 
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(fileUpload({useTempFiles:true}))
//FOLOW UN FOLLOW
app.use(methodOverride('_method',{
    methods:['POST','GET']
}))

app.use(express.static('public'))
//router
//burada check yaprik her get te kontrol et
app.use('*',checkUser)
app.use('/',pageRouter)
app.use('/photos',photoRouter)
app.use('/users',userRouter)


/*
//statick 
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/about',(req,res)=>{
    res.render('about')
})
*/
app.listen(port,()=>{
    console.log('baglandik')
})