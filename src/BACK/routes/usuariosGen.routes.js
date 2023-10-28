const { Router } = require('express');
const { CreateUserUG, ReadAllUserUG, ReadUserUG, UpdateUserUG, DeleteUserUG } = require('../database/usuariosGeneralDatabase.js');

const usuariosGenRouter = Router();

//Middleware que loguea la ip
usuariosGenRouter.use((req, res, next) => {
    console.log(req.ip);
    console.log('Ruta Gen');
    next();
});

//Crea un nuevo usuario
usuariosGenRouter.post('/add', (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const edad = req.body.edad;
    const dni = req.body.dni;
    const ambito = req.body.ambito;
    const disciplina = req.body.disciplina;
    const trabajo_de = req.body.trabajo_de;
    const biografia = req.body.biografia;

    CreateUserUG(nombre, apellido, email, edad, dni, ambito, disciplina, trabajo_de, biografia, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Usuario agregado correctamente');
            res.redirect('/list');
        }
    });
});

//Devuelve todos los usuarios de la base de datos
usuariosGenRouter.get('/list', (req, res) => {
    ReadAllUserUG((err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.redirect('/list');
        }
    });
});

//Devuelve un usuario a partir de su id
usuariosGenRouter.get('/list/:id', (req, res) => {
    const {id} = req.params;

    ReadUserUG(id, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.redirect('/edit');
        }
    });
});

//Actualiza los datos de un usuario especificado por su id
usuariosGenRouter.patch('/edit/:id', (req, res) => {
    UpdateUserUG( (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.redirect('/list');
        }
    });
});

//Elimina al usuario correspondiente al id enviado
usuariosGenRouter.delete('/delete/:id', (req, res) => {
    const {id} = req.params;

    DeleteUserUG(id, (err) => {
        if(err){
            res.status(500).send(err.message);
        } else{
            res.redirect('/list');
        }
    });
});

module.exports.usuariosGenRouter = usuariosGenRouter;