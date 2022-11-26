const { Schema, model } = require('mongoose');

const EtapasSchema = Schema({
    nombre: {
            type: String,
            etapas: [
                'anteproyecto',
                'entregaparcial1',
                'entregaparcial2',
                'etregafinal',
            ],    
            required: true,
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

module.exports = model('Etapas', EtapasSchema);