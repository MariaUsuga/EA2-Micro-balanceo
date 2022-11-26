const mongoose = require('mongoose');

const getConnection = async () => {
    try {   
        const url = 'mongodb+srv://mariaIUDigital:W9mg2eVxh9BrUL1O@cluster0.wesosjd.mongodb.net/ASEESORIA-ACADEMIICA'

        await mongoose.connect(url);

        console.log('Conexion exitosa');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getConnection,
}