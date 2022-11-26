const { Schema, model } = require('mongoose');

const ProyectoSchema = Schema({
    numero: {
        type: Number, required: true, unique: true,
    },
    titulo: {
        type: String, required: true,
    },
    valor: {
        type: Number, required: true,
    },    
    cliente: {
        type: Schema.Types.ObjectId, ref: 'cliente', required: false,
    },
    tipoProyecto: {
        type: Schema.Types.ObjectId, ref: 'tipoProyecto', required: true
    },
    universidad: {
        type: Schema.Types.ObjectId, ref: 'universidad', required: true,
    },
    etapas: {
        type: Schema.Types.ObjectId, ref: 'etapas', required: true,
    }   
});

module.exports = model('Proyecto', ProyectoSchema);