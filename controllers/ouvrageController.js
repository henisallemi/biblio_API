const { Ouvrage, User, Emprunt } = require("../model");

exports.check = async (req, res, next) => {  
  try {
    const adherant = await User.findByPk(req.body.adherant);
    const ouvrage = await Ouvrage.findByPk(req.body.ouvrage);

    ouvrage.nombreDisponible--;   

    const emprunt = await Emprunt.create({
      userId: adherant.id,
      ouvrageId: ouvrage.id,
      ...req.body,
      dateEmprunt: new Date(),
    })

    await ouvrage.save();

    res.status(200).json({ emprunt });
  } catch (error) {
    console.log(error);
  }
}; 

exports.retour = async (req, res, next) => { 
  try {
    const adherant = await User.findByPk(req.body.adherant);
    const ouvrage = await Ouvrage.findByPk(req.body.ouvrage);
    const emprunt = await Emprunt.findOne({where: {ouvrageId: ouvrage.id, userId: adherant.id}});

    ouvrage.nombreDisponible++;

    await ouvrage.save();

    emprunt.isReturned = true;

    emprunt.returnedAt = req.body.returnedAt

    await emprunt.save();


    res.status(200).json({ });
  } catch (error) {
    console.log(error);
  }
};
