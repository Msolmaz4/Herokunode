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
      url:result.secure_url,
      image_id:result.public_id
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

const deletePhoto= async(req,res)=>{
  try {
    const photo = await Photo.findById(req.params.id)
    const photoId =photo.image_id

    await cloudinary.uploader.destroy(photoId)
    await Photo.findByIdAndRemove({_id : req.params.id})
    
    res.status(200).redirect('/users/dashboard');
      
  } catch (err) {
      
  }

}

const  updatePhoto= async(req,res)=>{
  try {
    const photo = await Photo.findById(req.params.id);

    if (req.files) {
      const photoId = photo.image_id;
      await cloudinary.uploader.destroy(photoId);

      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          use_filename: true,
          folder: 'lenslight_tr',
        }
      );

      photo.url = result.secure_url;
      photo.image_id = result.public_id;

      fs.unlinkSync(req.files.image.tempFilePath);
    }

    photo.name = req.body.name;
    photo.description = req.body.description;

    photo.save();

    res.status(200).redirect(`/photos/${req.params.id}`);
      
  } catch (err) {
      
  }

}

export { createPhoto,getAllPhotos,getAPhotos,deletePhoto,updatePhoto };
