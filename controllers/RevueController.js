const { Revue, Ouvrage, Emprunt, User } = require("../model");
const Sequelize = require("sequelize");
const HttpError = require("../misc/Errors/HttpError");

exports.getRevues = async (req, res, next) => {
  try {  
    let { page, limit, recherche, target } = req.query;
    const likeObj = recherche ? { [Sequelize.Op.like]: `%${recherche}%` } : null;

    limit = parseInt(limit) || 15; 
    page = parseInt(page) || 1;
    target = target ?? ""; 
    console.log(target)
    const offset = limit * (page - 1);
    const totalCount = await Revue.count();
    const revues = await Revue.findAll({
      include: [ 
        {
          model: Ouvrage,
          options: { eager: true },
          as: "ouvrage",
          where: target && likeObj ? {   
                [Sequelize.Op.or]: [ 
                  target == 1
                  ? { titre: likeObj }  
                  : target == 2
                  ? { auteur1: likeObj }    
                  : target == 3
                  ? { date: likeObj }
                  : {} 
                ],
              } : {}, 
        },   
      ],
      subQuery: false,
      offset: offset,
      limit: limit,

    });
    res.status(200).json({ totalCount, revues }); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getRevueById = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    const revue = await Revue.findByPk(id);
    if (!revue) 
      return next(new HttpError(404, "il n'ya pas de revue avec ce id"));
    res.status(200).json(revue);
  } catch (error) {
    console.log(error); 
  }
};

exports.createRevue = async (req, res, next) => {
  try {  
    console.log(req.body); 
    let createdRevue = await Revue.create({ ...req.body }); 
    let createdOuvrage = await Ouvrage.create({ ...req.body, revueId: createdRevue.id, nombreDisponible: req.body.nombreExemplaire });

    await createdRevue.setOuvrage(createdOuvrage); 

    res.status(201).json({ revue : createdRevue });  
  } catch (error) {
    console.log(error);  
  }
};  

exports.updateRevue = async (req, res, next) => {
  try {
    let { id } = req.params;  
    let body = req.body;
    id = Number.parseInt(id);
    const revue = await Revue.findOne({ where: { id }, include: { model: Ouvrage, eager: true, as: "ouvrage" } });

    await Revue.update(body, { where: { id } });
    await Ouvrage.update(body, { where: { id: revue.ouvrage.id } })
    res.status(200).json({ message: "updated revue" });
  } catch (error) {
    console.log(error);   
  }
}; 

exports.deleteRevue = async (req, res, next) => {
  try {    
    let { id } = req.params; 
    id = Number.parseInt(id); 
    await Revue.destroy({ where: { id } })
    res.status(200).json({ message: "supprimé  revue" });
  } catch (error) {
    console.log(error); 
  }
};
