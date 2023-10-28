const { Router } = require('express');
const {  } = require('../database/publicacionesDatabase.js');

const publicacionesRouter = Router();

//Middleware que loguea la ip
publicacionesRouter.use((req, res, next) => {
    console.log(req.ip);
    next();
});

//Devuelve todos los usuarios de la base de datos
publicacionesRouter.get('/', (req, res) => {

});

//Devuelve un usuario a partir de su id
publicacionesRouter.get('/:id', (req, res) => {

});

//Crea un nuevo usuario
publicacionesRouter.post('/', (req, res) => {
    
});

//Actualiza los datos de un usuario especificado por su id
publicacionesRouter.patch('/:id', (req, res) => {
    
});

//Elimina al usuario correspondiente al id enviado
publicacionesRouter.delete('/:id', (req, res) => {
    
});

module.exports.publicacionesRouter = publicacionesRouter;