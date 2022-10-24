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

export {getIndexPage,getAboutPage,getRegisterPage }