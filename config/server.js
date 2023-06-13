const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./dbconfig');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
        }


        // Data base connection
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // // Routes
        // this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Keeping json in body
        this.app.use( express.json() );

        // mOMENTANEO
        this.app.use( express.static('public') );

    }

    // routes() {

    //     this.app.use( this.paths.buscar, require('../routes/listTodos'));
        
    // }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server listening to port: ', this.port );
        });
    }

}




module.exports = Server;