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
    const emprunt = await Emprunt.findOne({where: {ouvrage, user: adherant}});

    ouvrage.nombreDisponible--;

    emprunt.isReturned = true;

    await emprunt.save();

    await ouvrage.save();

    res.status(200).json({ });
  } catch (error) {
    console.log(error);
  }
};
