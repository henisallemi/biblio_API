const { Ouvrage, User } = require("../model");

exports.check = async (req, res, next) => {
  try {
    const adherant = await User.findByPk(req.body.adherant);
    const ouvrage = await Ouvrage.findByPk(req.body.ouvrage);

    ouvrage.nombreDisponible--;

    
    await adherant.addOuvrage(ouvrage)
    
    await ouvrage.save();

    res.status(200).json({});
  } catch (error) {
    console.log(error);
  }
};
