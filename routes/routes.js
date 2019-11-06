const arangoRoutes = require('../arangoAPI');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('Bem Vindo ArangoDB API!!');
    });
    arangoRoutes(app, fs);
};

module.exports = appRouter;