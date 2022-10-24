import Photo from "../models/photoModels.js";

//temelde baasit yapiyi kurdiuk geleni req.body attik sonra res statiu sile geri gonderdik
const createPhoto = async (req, res) => {
  try {
    const photo = await Photo.create(req.body);
    res.status(201).json({
      succed: true,
      photo,
    });
  } catch (error) {
    res.status(500).json({
      succed: false,
      error,
    });
  }
};

//butun fotograflari cagirmak icin
const getAllPhotos = async(req,res)=>{
    try {
        const photos = await Photo.find({})
        res.status(200).json({
            succed:true,
            photos
        })
        
    } catch (err) {
        
    }

}



export { createPhoto,getAllPhotos };
