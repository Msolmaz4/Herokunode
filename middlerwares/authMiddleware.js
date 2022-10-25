import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//1 kullanici token ulasiriy ilk once auttoken yaptik sonra app.js import ederiz
const checkUser = async (req,res,next)=>{
 //1
  const token = req.cookies.jwt

  if(token){
    jwt.verify(token,process.env.JWT_SECRET,async(err,decoded)=>{
      if (err) {
        console.log(err.message);
        res.locals.user = null
        next()
      } else{
        const user = await User.findById(decoded.userId)
        res.locals.user=user
        next()
      }
    })
  }else{
    res.locals.user = null
    next()
  }
}









const authenticateToken = async (req, res, next) => {
  /*burada tokeni nasil elde ettigimiyi ortaya cikarttik
    const authHeader =req.headers['authorization']
    console.log('authHeader',authHeader)
    const token =authHeader && authHeader.split(' ')[1]
    console.log(token)
    */

  // artik burdan almiyoruy coo yuk const token =req.headers['authorization'] && req.headers['authorization'].split(' ')[1]
  const token = req.cookies.jwt;
  /*
ilk basta 
if(!token){
    return res.status(401).json({
        succed:false,
        error:'no token available'
    })
 req.user =await User.findById(
    jwt.verify(token,process.env.JWT_SECRET).userId
 )
*/
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};
export { authenticateToken ,checkUser};
