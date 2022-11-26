const { Router } = require('express');
const Proyecto = require('../models/proyecto');
const { validarProyecto } = require('../helpers/validar-proyecto');

const router = Router();

    router.get('/', async function(req, res) {
        try {
            const proyectos = await Proyecto.find();
            console.log(proyectos);
            res.send(proyectos);
        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
    });

router.post('/', async function(req, res) {
    try {
        const validaciones = validarProyecto(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        const existeProyectoPorNumero = await Proyecto.findOne({ numero: req.body.numero });
        if (existeProyectoPorNumero) {
            return res.status(400).send('Ya existe el numero para otro proyecto');
        }

        let proyecto = new Proyecto();
        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechainiciacion = new Date();
        proyecto.fechaentrega = new Date();
        proyecto.valor = req.body.valor;
        proyecto.fechacreacion = new Date();
        proyecto.fechaactualizacion = new Date();
        proyecto.cliente = req.body.cliente._id;
        proyecto.universidad = req.body.universidad._id;
        proyecto.tipoProyecto = req.body.tipoProyecto._id;
        proyecto.etapas = req.body.etapas._id;
        
    
 
        proyecto = await proyecto.save();

        res.send(proyecto);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear el proyecto');
    }
});

router.put('/:proyectoId', async function(req, res) {
    try {
        let proyecto = await Proyecto.findById(req.params.proyectoId);
        if (!proyecto) {
            return res.status(400).send('El proyecto no existe');
        }

        const existeProyectoPorNumero = await Proyecto.findOne({ numero: req.body.numero, _id: { $ne: proyecto._id } });
        if (existeProyectoPorNumero) {
            return res.status(400).send('Ya existe el numero para otro proyecto');
        }

        const validaciones = validarProyecto(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaIniciacion = new Date();
        proyecto.fechaEntrega = new Date();
        proyecto.valor = req.body.valor;
        proyecto.cliente = req.body.cliente._id;
        proyecto.universidad = req.body.universidad._id;
        proyecto.tipoProyecto = req.body.tipoProyecto._id;
        proyecto.etapas = req.body.etapas._id;
        proyecto.fechaActualizacion = new Date();
        

        proyecto = await proyecto.save();

        res.send(proyecto);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar Proyectos');
    }
});

module.exports = router;
