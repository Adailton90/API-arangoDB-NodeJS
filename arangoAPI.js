const multer = require('multer')
const upload = multer()
const arangojs = require("arangojs");
const dataEmenda = require('./data/fileEmenda');
const aqlQuery = require('arangojs').aqlQuery;
const fs = require('fs');

const arangoRoutes = (app) => {

    const db = new arangojs.Database();
    db.useDatabase('emenda')

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

    //inserindo documentos em uma collection
    app.post('/insertDocument', async(req, res) => {
        await db.useDatabase('emenda').collection(req.body.collection).save(req.body.doc).then(
            meta => console.log('Document saved:', meta._rev),
            err => console.error('Failed to save document:', err)
        );
    })

    app.post('/fileInsertDocument', upload.single('file'), async(req, res) => {

        const jsonFile = []
        fs.writeFile(req.file, JSON.stringify(jsonFile), 'utf8',
            (err) => {
                if (err)
                    reject(null);
                resolve(true);
            })
        console.log(jsonFile)

        // await db.useDatabase('emenda').collection(req.body.collection).import(docs).then(
        //     result => console.log('Import complete:', result),
        //     err => console.error('Import failed:', err)
        // );
    })

    //listando todos documentos de uma collection
    app.get('/listdoc/:collection', async(req, res) => {
        let alldocs = []
        await db.useDatabase('emenda').collection(req.params.collection).all().then(
            cursor => cursor.map(doc => alldocs.push(doc),
                err => res.send('Failed to fetch all documents:', err)
            ));
        return res.send(alldocs);

    })

    //buscando por filtro
    app.get('/filterdoc/:collection/:filter', async(req, res) => {
        let filterDoc = []
        await db.query(`FOR emenda IN emendaCollection FILTER CONTAINS(emenda.Ano, '2015') RETURN emenda`).then(
            cursor => cursor.map(doc => filterDoc.push(doc),
                err => res.send('Failed to fetch all documents:', err)
            ));
        return res.send(filterDoc);
    })


    //excluindo arquivo pela chave
    app.delete('/deleteDoc/:collection/:key', async(req, res) => {
        await db.useDatabase('emenda').collection(req.params.collection).remove(req.params.key).then(
            () => res.send('Document removed'),
            err => console.error('Failed to remove document', err)
        );
        return res.send('error trying to delete document');

    })
}
module.exports = arangoRoutes;