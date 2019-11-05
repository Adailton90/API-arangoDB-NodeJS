const arangojs = require("arangojs");
const db = new arangojs.Database();

const arangoRoutes = (app) =>{
    app.get('/listAll', async(req, res) => {
        try {
            db.listCollections().then((collections) => {
                collections.map((collection) => {
                  return collection.name
                
              });
        }
    }
}

module.exports = arangoRoutes;