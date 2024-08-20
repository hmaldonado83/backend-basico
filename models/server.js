const express = require('express');
var cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.userPath ='/api/user';
        //Middlewares
        this.middlewares();

        ///Rutas de mi aplicacion
        this.routes();

        
        
    }

    middlewares() {

        //Cors
        this.app.use(cors());

        //Lectura y parseo del Body
        this.app.use( express.json());
        
        //Directorio publico
        this.app.use( express.static('public'));
    }


    routes(){
        this.app.use(this.userPath, require('../routes/user'));
    }
    listen(){
        this.app.listen( this.port, () => {
            console.log("Servidor Corriendo en puerto", this.port);
        });
    }

}


module.exports = Server;
