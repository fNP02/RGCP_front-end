const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database/RGCP_DB.db');

//Guarda la info de una nueva publicacion
function CreatePubli(institucionName, img, categorias, descripcion, callback) {
    db.run("INSERT INTO publicaciones (institucionName, img, categorias, descripcion) VALUES (?, ?, ?, ?)", [institucionName, img, categorias, descripcion], callback);
}

//Devuelve todos las publicaciones
function ReadAllPubli(callback) {
    db.all("SELECT rowid AS publicacionID, institucionName, img, categorias, descripcion FROM publicaciones", callback);
}

/**
 * Devuelve una publicacion especifica
 * @param {id} publicacionID Id a buscar
 */
function ReadPubli(publicacionID, callback) {
    db.get("SELECT * FROM publicaciones WHERE publicacionID = ?", [publicacionID], callback);
}

//Actualiza los datos de una publicacion especificada por su id
function UpdatePubli(institucionName, img, categorias, descripcion, publicacionID, callback) {
    db.run("UPDATE publicaciones SET institucionName = ?, img = ?, categorias = ?, descripcion = ? WHERE publicacionID = ?", [institucionName, img, categorias, descripcion, publicacionID], callback);
}

//Elimina a una publicacion especificada por su id
function DeletePubli(publicacionID, callback) {
    db.run("DELETE FROM publicaciones WHERE publicacionID = ?", [publicacionID], callback);
}

module.exports = {
    CreatePubli,
    ReadAllPubli,
    ReadPubli,
    UpdatePubli,
    DeletePubli
}