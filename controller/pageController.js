const getIndexPage =(req,res)=>{
res.render('index',{
    link:'index'
})
}
//sayafalara felindigindeki aktiv oaln sayfayi gosyermek icin link yaptim
const getAboutPage =(req,res)=>{
    res.render('about',{
        link:'about'
    })
}



const getRegisterPage =(req,res)=>{
        res.render('register',{
            link:'register'
        })
}



const getLoginPage =(req,res)=>{
            res.render('login',{
                link:'login'
            })
}

export {getIndexPage,getAboutPage,getRegisterPage,getLoginPage }