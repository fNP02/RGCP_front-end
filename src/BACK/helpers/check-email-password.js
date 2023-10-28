const checkEmailPassword = (mail, password) => {

    if (!mail || !password) {
        return res.send(400);
    }

    //Llamo a la base de datos, traigo todos los datos y comparo email y password
}

module.exports.checkEmailPassword = checkEmailPassword;