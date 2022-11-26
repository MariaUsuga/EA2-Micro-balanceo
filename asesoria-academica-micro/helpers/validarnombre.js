const { check } = require('express-validator');

const checkvalidar = () => {
    return[
        check("nombre")
        .notEmpty()
        .withMessage("El nombre no puede estar vacio")
        .isLength({ min: 3, max:40})
        .withMessage("La longitud del nombre debe ser mayor a 3 y menor a 40"),
    ]
}

module.exports = {
    checkvalidar
}