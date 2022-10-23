import Photo from "../models/photoModels";


//temelde baasit yapiyi kurdiuk geleni req.body attik sonra res statiu sile geri gonderdik 
const createPhoto = (req,res)=>{
    const photo =Photo.create(req.body)
    res.status(201).json({
        succed:true,
        photo
    })

}


export {createPhoto }