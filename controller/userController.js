import User from "../models/userModel.js";

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
export { createUser };