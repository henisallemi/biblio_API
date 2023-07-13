const { LIVRE, ARTICLE, REVUE } = require("../config/config");
const { User, Emprunt, Livre, Revue, Article, Ouvrage } = require("../model");
const { Op, sequelize } = require('sequelize');

exports.getAdminDashboard = async (req, res, next) => {
    try {

        const livreCount = await Livre.count();
        const articlesCount = await Article.count();
        const revuesCount = await Revue.count();


        const total = livreCount + articlesCount + revuesCount;

        let livresStats = (livreCount / total).toFixed(1);
        let articlesStats = (articlesCount / total).toFixed(1);
        let revuesStats = (revuesCount / total).toFixed(1);

        let sum = parseFloat(livresStats) + parseFloat(articlesStats) + parseFloat(revuesStats);
        if (sum !== 1.0) {
            if (livresStats >= 0.1) {
                livresStats = (parseFloat(livresStats) - (sum - 1.0)).toFixed(1);
            } else if (articlesStats >= 0.1) {
                articlesStats = (parseFloat(articlesStats) - (sum - 1.0)).toFixed(1);
            } else {
                revuesStats = (parseFloat(revuesStats) - (sum - 1.0)).toFixed(1);
            }
        }


        const numberOfDays = 3; // The number of days to check

        const currentDate = new Date(); // Get the current date
        const endDate = new Date(); // Create a new date object

        endDate.setDate(currentDate.getDate() + numberOfDays);


        const emprunts = await Emprunt.findAll({
            where: {
                dateDeRetour: {
                    [Op.gte]: currentDate, // Records created on or after the start date
                    [Op.lte]: endDate
                },
                isReturned: false
            }, include: [
                {
                    model: Ouvrage,
                    include: [
                        {
                            model: Livre,
                            options: { eager: true },
                            as: "livre",
                        },
                        {
                            model: Article,
                            options: { eager: true },
                            as: "article",
                        },
                        {
                            model: Revue,
                            options: { eager: true },
                            as: "revue",
                        },
                    ],
                    options: { eager: true },
                    as: "ouvrage",
                },
                {
                    model: User,
                    as: "user"
                }
            ]
        });

        const items = emprunts.map(emprunt => {
            const ouvrage = emprunt.ouvrage;
            const type = emprunt.ouvrage.livre ? LIVRE : emprunt.ouvrage.article ? ARTICLE : REVUE

            return {
                ouvrage,
                emprunt,
                type
            }
        })

        const stats = {
            livresStats: parseFloat(livresStats),
            articlesStats: parseFloat(articlesStats),
            revuesStats: parseFloat(revuesStats),
            items
        }
        res.status(200).json({ stats, totalCount: 0 });
    } catch (error) {
        console.log(error);
    }
};