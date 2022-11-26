const { Schema, model } = require('mongoose');

const TipoProyectoSchema = Schema({
    nombre: {
        type: String,
        tipoproyecto: [
            'ensayo',
            'articulo',
            'monografia',
            'trabajofinalpregrado',
            'trabajofinalpostgrado'
        ],    
        required: true
    },    
    
    fechaCreacion: {
        type: Date,
        required: true,
    },
    fechaActualizacion: {
        type: Date,
        required: true,
    }
});

module.exports = model('TipoProyecto', TipoProyectoSchema);