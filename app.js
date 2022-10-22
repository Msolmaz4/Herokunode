import express from 'express'
const app =express()
const port = 4500


app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.send('hayat guyeeeel')
})

app.listen(port,()=>{
    console.log('baglandik')
})