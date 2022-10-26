import Photo from "../models/photoModels.js";

//temelde baasit yapiyi kurdiuk geleni req.body attik sonra res statiu sile geri gonderdik
const createPhoto = async (req, res) => {
  try {
    const photo = await Photo.create(req.body);
    res.status(201).redirect('/users/dashboard')
    
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
        const photos = await Photo.find({})
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
      const photo = await Photo.findById({ _id: req.params.id })
      res.status(200).render('photo',{
        photo,
        link: 'photos',
      })
      
  } catch (err) {
      
  }

}


export { createPhoto,getAllPhotos,getAPhotos };
