const arangoRoutes = (app, fs) => {
    // const fs = require('fs');
    //const emendaPath = './emenda72.json';
    const arangojs = require("arangojs");
    const dataEmenda = require('./data/fileEmenda');

    const db = new arangojs.Database();

    app.post('/createdb', async(req, res) => {
        await db.createDatabase(req.body.nome).then(
            () => console.log('Database created'),
            err => console.error('Failed to create database:', err)
        );
        return res.send("Banco criado com sucesso!!")
    });

    //createCollection
    app.post('/createCollection', async(req, res) => {
        await db.useDatabase('emenda').collection(req.body.collection).create().then(
            () => res.send('Collection created'),
            err => res.status(400).send('Failed to create collection:')
        );
    })

    app.post('/insertDocument', async(req, res) => {
        await db.useDatabase('emenda').collection(req.body.collection).save(req.body.doc).then(
            meta => console.log('Document saved:', meta._rev),
            err => console.error('Failed to save document:', err)
        );
    })


    app.get('/listdoc', async(req, res) => {
        try {
            const data = await dataEmenda.readEmenda()
            return res.send(data)
        } catch (error) {
            return res.status(400).json({ error: 'Erro nos reistros da base' });
        }

    })
}
module.exports = arangoRoutes;