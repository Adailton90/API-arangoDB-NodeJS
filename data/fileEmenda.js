const fs = require('fs');
const emendaPath = './emenda72.json';

module.exports = {
    saveEmenda: (data) => {
        return new Promise((resolve, reject) => {
            try {
                fs.writeFile(
                    emendaPath,
                    JSON.stringify(data), 'utf8',
                    (err) => {
                        if (err)
                            reject(null);
                        resolve(true);
                    });
            } catch (error) {
                reject(error);
            }
        });
    },

    readEmenda: () => {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(emendaPath, (err, data) => {
                    if (!err)
                        resolve(JSON.parse(data));
                    reject(null);
                });
            } catch (error) {
                reject(error);
            }

        })

    }


}