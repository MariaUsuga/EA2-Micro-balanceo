const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const router = Router();
const Cliente = require('../models/cliente');

router.post('/', 
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('email', 'email.requerido').not().isEmpty(),
    async function(req, res) {
        try {
            const existeCliente = await Cliente.findOne({ email: req.body.email });
            if (existeCliente) {
                return res.status(400).send('Email ya existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }
    
            let cliente = new Cliente();
            cliente.nombre = req.body.nombre;
            cliente.email = req.body.email;
            cliente.fechaCreacion = new Date();
            cliente.fechaActualizacion = new Date();
            
            cliente = await cliente.save();

            res.send(cliente);
        } catch(error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
});


module.exports = router;