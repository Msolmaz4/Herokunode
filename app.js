import express from 'express'
const app =express()
const port = 4500

//ejs 
app.set('view engine','ejs')

//statick 
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/about',(req,res)=>{
    res.render('about')
})

app.listen(port,()=>{
    console.log('baglandik')
})