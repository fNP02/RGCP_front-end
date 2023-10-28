const { Router } = require('express');
const {  } = require('../database/usuarioSesionDatabase.js')

const authRouter = Router();

//Endpoint publico (No autenticado y no autorizado)
authRouter.get("publico", (req, res) => {
    res.send("Endpoint publico");
})

//Endpoint autenticado para todo usuario registrado
authRouter.post("autenticado", (req, res) => {
    

    res.send(`Usuario ${mail} autenticado`)
});

//Endpoint autorizado a administradores


module.exports.authRouter = authRouter;