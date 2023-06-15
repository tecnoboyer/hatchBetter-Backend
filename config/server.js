const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./dbconfig');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server, {
            cors: {
              origin: '*', // Replace '*' with your frontend's URL or restrict it to a specific domain
              methods: ['GET', 'POST','PUT','DELETE'],
              allowedHeaders: ['Content-Type'],
              credentials: true,
            },
          });

        this.paths = {
            add:   '/api/adminTask',
        }

        // Data base connection
        this.conectarDB();
        // // Middlewares
        this.middlewares();

        // Routes
        this.app.use( this.paths.add, require('../routes/tasks'));

        //Sockets
        this.sockets();



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


    sockets(){
        this.io.on('connection',socket =>{
            console.log('Cliente conectado');
        });
    }


    listen() {
        this.server.listen( this.port, () => {
            console.log('Server listening to port: ', this.port );
        });
    }
}

module.exports = Server;