const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database/RGCP_DB.db');

//Guarda la info de un nuevo usuario
function CreateUserUS(nombre, apellido, email, contraseña, rol, callback) {
    db.run("INSERT INTO usuarioSesion (nombre, apellido, email, contraseña, rol) VALUES (?, ?, ?, ?, ?)", [nombre, apellido, email, contraseña, rol], callback);
}

//Devuelve todos los usuarios
function ReadAllUserUS(callback) {
    db.all("SELECT rowid AS UserSesID, nombre, apellido, email, contraseña, rol FROM usuarioSesion", callback);
}

//Devuelve un usuario especifico
function ReadUserUS(UserSesID, callback) {
    db.get("SELECT * FROM usuarioSesion WHERE UserSesID = ?", [UserSesID], callback);
}

//Actualiza los datos de un usuario especificado por su id
function UpdateUserUS(nombre, apellido, email, contraseña, rol, UserSesID, callback) {
    db.run("UPDATE usuarioSesion SET nombre = ?, apellido = ?, email = ?, contraseña = ?, rol = ? WHERE UserSesID = ?", [nombre, apellido, email, contraseña, rol, UserSesID], callback);
}

//Elimina a un usuario especificado por su id
function DeleteUserUS(UserSesID, callback) {
    db.run("DELETE FROM usuarioSesion WHERE UserSesID = ?", [UserSesID], callback);
}

module.exports = {
    CreateUserUS,
    ReadAllUserUS,
    ReadUserUS,
    UpdateUserUS,
    DeleteUserUS
}