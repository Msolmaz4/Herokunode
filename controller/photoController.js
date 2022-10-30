import Photo from "../models/photoModels.js";

//cloud sonra yaptik
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'



//temelde baasit yapiyi kurdiuk geleni req.body attik sonra res statiu sile geri gonderdik
const createPhoto = async (req, res) => {



//burada colud islemi  yukleme yaman alir dasboard form nctype="multipart/form-data"ve name image ekledik onemli

const result = await cloudinary.uploader.upload(
  req.files.image.tempFilePath,{
    use_filename:true,
    folder:'lenslight_tr'
  }
)
console.log(result)

  try {
    await Photo.create({
      name:req.body.name,
      description:req.body.description,
      user:res.locals.user._id,
      url:result.secure_url
    });
    fs.unlinkSync(req.files.mage.tempFilePath)
    res.status(201).redirect('/users/dashboard');
    
  } catch (error) {
    res.status(500).json({
      succed: false,
      error,
    });
  }
};

//butun fotograflari cagirmak icin
//ilk basta boyle zapariy geneli gormek icin
/**
 * const getAllPhotos = async(req,res)=>{
    try {
        const photos = await Photo.find({})
        res.status(200).json({
            succed:true,
            photos
        })
        
    } catch (err) {
        
    }

}

 */

//burda sageerkeli sayfayi ]render ederiz
// res.status(200).render('photos') sonra gelenleri de yuklemekicin r('photos',{photos }) yaoarak yenileri de //yukleriz
const getAllPhotos = async(req,res)=>{
    try {
        const photos = res.locals.user
         ?  await Photo.find({user:{$ne:res.locals.user._id}})
         : await Photo.find({})
        res.status(200).render('photos',{
          photos,
          link: 'photos',
        })
  
       
        
    } catch (err) {
        
    }

}

//fotografin detailin gitmek icin
//obje oldugundan ({_id : req.body.id}) : iki nokta ile esirledik buna dikkat

const getAPhotos = async(req,res)=>{
  try {
      const photo = await Photo.findById({ _id: req.params.id }).populate('user')
      res.status(200).render('photo',{
        photo,
        link: 'photos',
      })
      
  } catch (err) {
      
  }

}


export { createPhoto,getAllPhotos,getAPhotos };
