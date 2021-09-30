// Servidor Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');




class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // http server
        this.server =  http.createServer( this.app );
        //Configuración del socket server
        this.io = socketio( this.server, {/** configuraciones */} );
    }

    
    middlewares() {        
        this.app.use(express.static( path.resolve(__dirname, '../public') ));
    }

    configurarSockets(){
        new Sockets(this.io);
    }
    
    execute() {
        //Inicializar middlewares

        this.middlewares();
        this.configurarSockets();
        //inicializar serverd
        this.server.listen(this.port, () => {
            console.log('listening on *:', this.port);
          });
    }

}

module.exports = Server;