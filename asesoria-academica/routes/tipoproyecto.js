const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const TipoProyecto = require('../models/tipoproyecto');

const router = Router();

router.get('/', async function(req, res) {
    try {
        const tipoproyecto = await TipoProyecto.find();
        res.send(tipoproyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/',
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('tipoproyecto', 'tipoproyecto.requerido').isIn(['Ensayo', 'Articulo', 'Monografia', 'Trabajofinalpregrado','Trabajofinalpostgrado']),
    ],
    async function(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            let tipoProyecto = new TipoProyecto();
            
            tipoProyecto.nombre = req.body.nombre;
            tipoProyecto.ensayo = req.body.ensayo;
            tipoProyecto.articulo = req.body.articulo;
            tipoProyecto.monografia = req.body.monografia;
            tipoProyecto.trabajofinalpregrado = req.body.trabajofinalpregrado;
            tipoProyecto.trabajofinalpostgrado = req.body.trabajofinalpostgrado;
            tipoProyecto.fechaCreacion = new Date();
            tipoProyecto.fechaActualizacion = new Date();
            
            tipoProyecto = await tipoProyecto.save();
            
            res.send(tipoProyecto);
        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
});

router.put('/:tipoProyectoId',
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('tipoproyecto', 'tipoproyecto.requerido').isIn(['Ensayo', 'Articulo', 'Monografia', 'Trabajofinalpregrado','Trabajofinalpostgrado']),
    ],
    async function(req, res) {
        try {
            let tipoProyecto = await TipoProyecto.findById(req.params.tipoProyectoId);
            if (!tipoProyecto) {
                return res.send('Tipo proyecto no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            tipoProyecto.nombre = req.body.nombre;
            tipoProyecto.ensayo = req.body.ensayo;
            tipoProyecto.articulo = req.body.articulo;
            tipoProyecto.monografia = req.body.monografia;
            tipoProyecto.trabajofinalpregrado = req.body.trabajofinalpregrado;
            tipoProyecto.trabajofinalpostgrado = req.body.trabajofinalpostgrado;
            tipoProyecto.fechaActualizacion = new Date();

            tipoProyecto = await tipoProyecto.save();

            res.send(tipoProyecto);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
});

module.exports = router;
