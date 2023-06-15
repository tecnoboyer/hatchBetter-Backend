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
              origin: '*', // security issue
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

        const { tasksPost, tasksPut } = require('../controllers/tasks');

        this.app.use(this.paths.add, (req, res) => tasksPost(req, res, this.io));
        this.app.use(this.paths.add, (req, res) => tasksPut(req, res, this.io));

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


    sockets() {
      this.io.on('connection', (socket) => {
        console.log('Client connected: ' + socket.id);
    
        // Send a message from the server to the client immediately after connection
        socket.emit('message', 'Yes it is me');
    
        socket.on('message', (data) => {
          console.log('ServerSide: message received:', data);
    
          // Emit the 'response' event to the client
          socket.emit('response', 'mensajeDesdeElServer');
        });
      });
    }
      


    listen() {
        this.server.listen( this.port, () => {
            console.log('Server listening to port: ', this.port );
        });
    }
}

module.exports = Server;
