import User from "../models/userModel.js";
import bcrypt from 'bcrypt'

//temelde baasit yapiyi kurdiuk geleni req.body attik sonra res statiu sile geri gonderdik
//bunu yaptiktan sonra register els action yapmayi unutmaaction user/regisetr methof post
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      succed: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      succed: false,
      error,
    });
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
      res.status(400).send('dddddddddd')
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




export { createUser,loginUser };