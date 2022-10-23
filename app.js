import express from 'express'
import pageRouter from './routes/pageRouter.js'


import dotenv from 'dotenv'
dotenv.config()

import con from './db.js'
//
con()



const app =express()
const port = 4500


//ejs 
app.set('view engine','ejs')
//router
app.use('/',pageRouter)


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