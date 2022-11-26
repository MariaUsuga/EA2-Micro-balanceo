const { Router } = require('express');
const Etapas = require('../models/etapas');
const { validationResult, check } = require('express-validator');

const router = Router();

router.get('/', async function(req, res) {
    try {
        const etapas = await Etapas.find();
        console.log(etapas);
        res.send(etapas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/', 
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('etapas', 'etapas.requerido').isIn(['Anteproyecto', 'Entregaparcial1','Entregaparcial2','Entregafinal']).not().isEmpty(),
    ],
    async function(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            let etapas = new Etapas();
            etapas.nombre = req.body.nombre;
            etapas.anteproyecto = req.body.anteproyecto;
            etapas.entregaparcial1 = req.body.entregaparcial1;
            etapas.entregaparcial2 = req.body.entregaparcial2;
            etapas.entregafinal = req.body.entregafinal;
            etapas.fechaCreacion = new Date();
            etapas.fechaActualizacion = new Date();
            etapas = await etapas.save();
            res.send(etapas);
        } catch(error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
});

router.put('/:etapasId', 
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('etapas', 'etapas.requerido').isIn(['Anteproyecto', 'Entregaparcial1','Entregaparcial2','Entregafinal']).not().isEmpty(),
    ],
    async function(req, res) {
        try {
            let etapas = await Etapas.findById(req.params.etapasId);
            if (!etapas) {
                return res.send('No existado etapa');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }
            etapas.nombre = req.body.nombre;
            etapas.anteproyecto = req.body.anteproyecto;
            etapas.entregaparcial1 = req.body.entregaparcial1;
            etapas.entregaparcial2 = req.body.entregaparcial2;
            etapas.entregafinal = req.body.entregafinal;
            etapas.fechaActualizacion = new Date();
            
            etapas = await etapas.save();

            res.send(etapas);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

module.exports = router;