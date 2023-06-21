const { Utilisateur } = require("../model");
const HttpError = require("../misc/Errors/HttpError");

exports.getAllUsers = async (req, res, next) => {
    try {
        const utilisateurs = await Utilisateur.findAll();
        return res.status(200).json({ utilisateurs });
    } catch (error) {
        console.log(error);
    }
};     

exports.create = async (req, res, next) => {
    try {
        const { nom, prenom, email, motDePasse } = req.body
        const utilisateur = new Utilisateur({ nom, prenom, email, motDePasse });
        await utilisateur.save();

        return res.status(200).json({ utilisateur });
    } catch (error) {
        console.log(error); 
    }
};
 
  