const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database/RGCP_DB.db');

/**
 * Guarda la info de un nuevo usuario
 * @param {String} nombre 
 * @param {String} apellido 
 * @param {String} email 
 * @param {String} edad 
 * @param {String} dni 
 * @param {String} ambito 
 * @param {String} disciplina 
 * @param {String} trabajo_de 
 * @param {String} biografia
 */
function CreateUserUG(nombre, apellido, email, edad, dni, ambito, disciplina, trabajo_de, biografia, callback) {
    db.run("INSERT INTO usuarioGeneral (nombre, apellido, email, edad, dni, ambito, disciplina, trabajo_de, biografia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [nombre, apellido, email, edad, dni, ambito, disciplina, trabajo_de, biografia], callback);
}

/**
 * Devuelve todos los usuarios
 */
function ReadAllUserUG(callback) {
    db.all("SELECT rowid AS UserGenID, nombre, apellido, email, edad, dni, ambito, disciplina, trabajo_de, biografia FROM usuarioGeneral", callback);
}

/**
 * Devuelve un usuario especifico
 * @param {let} UserGenID Id del usuario a buscar
 */
function ReadUserUG(UserGenID, callback) {
    db.get("SELECT * FROM usuarioGeneral WHERE UserGenID = ?", [UserGenID], callback);
}

/**
 * Actauliza los datos de un usario especificado por su id
 * @param {String} nombre Nuevo nombre del usuario
 * @param {String} apellido Nuevo apellido del usuario
 * @param {String} email Nuevo email del usuario
 * @param {String} edad Nuevo edad del usuario
 * @param {String} dni Nuevo dni del usuario
 * @param {String} ambito Nuevo ambito del usuario
 * @param {String} disciplina Nuevo disciplina del usuario
 * @param {String} trabajo_de Nuevo trabajo_de del usuario
 * @param {String} biografia Nuevo biografia del usuario
 * @param {let} UserGenID Id del usuario a cambiar
 */
function UpdateUserUG(nombre, apellido, email, edad, dni, ambito, disciplina, trabajo_de, biografia, UserGenID, callback) {
    db.run("UPDATE usuarioGeneral SET nombre = ?, apellido = ?, email = ?, edad = ?, dni = ?, ambito = ?, disciplina = ?, trabajo_de = ?, biografia = ? WHERE UserGenID = ?", [nombre, apellido, email, edad, dni, ambito, disciplina, trabajo_de, biografia, UserGenID], callback);
}

/**
 * //Elimina a un usuario especificado por su id
 * @param {*} UserGenID
 */
function DeleteUserUG(UserGenID, callback) {
    db.run("DELETE FROM usuarioGeneral WHERE UserGenID = ?", [UserGenID], callback);
}

module.exports = {
    CreateUserUG,
    ReadAllUserUG,
    ReadUserUG,
    UpdateUserUG,
    DeleteUserUG
}