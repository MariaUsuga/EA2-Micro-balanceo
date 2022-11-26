const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const router = Router();
const Cliente = require('../models/cliente');

router.get('/', async function(req, res) {
    try {
        console.log("HOST", process.env.HOST);
        const clientes = await Cliente.find();
        console.log(clientes);
        res.send(clientes);
    } catch(error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
});

router.get('/:clienteId', async function(req, res) {
    try {
        let clientes = await Cliente.findById(req.params.clienteId);
        if (!clientes) {
            return res.status(400).send('El cliente no existe');
        }

        const validaciones = validationResult(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }


        res.send(clientes);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar el cliente');
    }
});


module.exports = router;