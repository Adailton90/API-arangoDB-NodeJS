const arangoRoutes = require('../arangoAPI');

const appRouter = (app) =>{
	app.get('/', (req, res) => {
        res.send('Bem Vindo ArangoDB API!!');
    });
	arangoRoutes(app);
};

module.exports = appRouter;