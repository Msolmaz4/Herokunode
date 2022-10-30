import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Photo from '../models/photoModels.js'
//temelde baasit yapiyi kurdiuk geleni req.body attik sonra res statiu sile geri gonderdik
//bunu yaptiktan sonra register els action yapmayi unutmaaction user/regisetr methof post
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
   
    res.status(201).json({user:user._id})
  } catch (error) {
     
    let errors2 = {}

    if (error.code === 11000) {
      errors2.email = 'The Email is already registered';
    }

    if(error.name === 'ValidationError'){
      Object.keys(error.errors).forEach((key)=>{
        errors2[key]=error.errors[key].message
      })
    }

    res.status(400).json(errors2)
  }
};

const loginUser= async (req, res) => {
  try {
    const {username,password} =req.body
    const user =await User.findOne({username:username})

    let same =false
    if(user){
      same = await bcrypt.compare(password,user.password)
    }else{
    return  res.status(500).json({
        succed: false,
        error:'login anschauen'
      });
    }
    if(same){
      // .send('dddddddddd') bunu ilk deneme icin 
      //token uretmeyi burrda yeniden yaapriz
      /**
       * json({
        user,
        token:createToken(user._id)
       */
      //sonra yenii token yapama
      const token = createToken(user._id)
      res.cookie('jwt',token, {
        httOnly:true,
        maxAge:1000*60*60*24
      })
      /**
       * res.status(400).json({
        user
      })
       */
      //giris yaptiktan sonra 
      res.redirect('/users/dashboard')
    }
    else{
      res.status(500).json({
        succed: false,
        error:'login password'
      });
    }
    
  } catch (error) {
    res.status(500).json({
      succed: false,
      error,
    });
  }
};


//buradada jwebtokeni kullamiyityor burda once userid alsin biy id saklamaj istiyoruy
//returnyapizoru  sonra sign kullaniyoruy sign bak
//uc parametre aliyor ilk once ne kullancagiy sonra sifreme sonra sure
//sonra login girisye gonderroy 
const createToken=(userId)=>{
  return jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:'1d'

  })

}


  const getDashboardPage = async (req, res) => {
    const photos = await Photo.find({ user: res.locals.user._id });
    res.render('dashboard', {
      link: 'dashboard',
      photos,
    });
}
const getAllUsers = async(req,res)=>{
  try {
      const users = await User.find({ _id:{$ne:res.locals.user._id}})
      res.status(200).render('users',{
        users,
        link: 'users',
      })
      
  } catch (err) {
      
  }

}

const getAUsers = async(req,res)=>{
  try {
      const user = await User.findById({ _id: req.params.id })
      const photos = await Photo.find({user:res.locals.user._id})
      res.status(200).render('user',{
        user,
        photos,
        link: 'user',
      })
      
  } catch (err) {
      
  }

}

export { createUser,loginUser,getDashboardPage,getAllUsers ,getAUsers};