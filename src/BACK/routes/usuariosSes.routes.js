const { Router } = require('express');
const {  } = require('../database/usuariosSesionDatabase.js');

const usuariosSesRouter = Router();

//Middleware que loguea la ip
usuariosSesRouter.use((req, res, next) => {
    console.log(req.ip);
    console.log('Ruta Ses');
    next();
});

//Crea un nuevo usuario
usuariosSesRouter.post('/', (req, res) => {
    
});

//Devuelve todos los usuarios de la base de datos
usuariosSesRouter.get('/', (req, res) => {

});

//Devuelve un usuario a partir de su id
usuariosSesRouter.get('/:id', (req, res) => {

});

//Actualiza los datos de un usuario especificado por su id
usuariosSesRouter.patch('/:id', (req, res) => {
    
});

//Elimina al usuario correspondiente al id enviado
usuariosSesRouter.delete('/:id', (req, res) => {
    
});

module.exports.usuariosSesRouter = usuariosSesRouter;