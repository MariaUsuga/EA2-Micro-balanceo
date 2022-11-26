const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Universidad = require('../models/universidad');

const router = Router();

router.get('/', async function(req, res) {
    try {
        const universidad = await Universidad.find();
        res.send(universidad);
    } catch(error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
});

router.post('/', 
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('direccion', 'direccion.requerido').not().isEmpty(),
        check('telefono', 'telefono.requerido').not().isEmpty(),
    ],
    async function(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            let universidad = new Universidad();
            universidad.nombre = req.body.nombre;
            universidad.direccion = req.body.direccion;
            universidad.telefono = req.body.telefono;
            universidad.fechaCreacion = new Date();
            universidad.fechaActualizacion = new Date();
            
            universidad = await universidad.save();

            res.send(universidad);
        } catch(error) {
            console.log(error);
            res.send('Ocurrio un error');
        }
});

router.put('/:universidadId', 
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('direccion', 'direccion.requerido').not().isEmpty(),
        check('telefono', 'telefono.requerido').not().isEmpty(),
    ],
    async function(req, res) {
        try {
            let universidad = await Universidad.findById(req.params.universidadId);
            if (!universidad) {
                return res.send('Universidad no existe');
            }
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            universidad.nombre = req.body.nombre;
            universidad.direccion = req.body.direccion;
            universidad.telefono = req.body.telefono;
            marca.fechaActualizacion = new Date();
            
            universidad = await universidad.save();

            res.send(universidad);
    } catch(error) {
        console.log(error);
        res.send('Ocurrio un error');
   }
});

module.exports = router;