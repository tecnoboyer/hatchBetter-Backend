const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./dbconfig');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            add:   '/api/adminTask',
        }

        // Data base connection
        this.conectarDB();
        // // Middlewares
        this.middlewares();

        // Routes
        this.app.use( this.paths.add, require('../routes/tasks'));
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        // Keeping json in body
        this.app.use( express.json() );
        this.app.use(express.urlencoded({ extended: false }));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server listening to port: ', this.port );
        });
    }
}

module.exports = Server;