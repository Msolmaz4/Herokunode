import express from 'express'
import pageRouter from './routes/pageRouter.js'
import photoRouter from './routes/photoRouter.js'
import userRouter from './routes/userRouter.js'

import dotenv from 'dotenv'
dotenv.config()

import con from './db.js'
//
con()



const app =express()
const port = 4500


//ejs 
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))
//router

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