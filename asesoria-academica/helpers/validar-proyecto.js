const validarProyecto = (req) => {
    const validaciones = [];
    if (!req.body.numero) {
        validaciones.push('Numero es requerido');
    }
    if (!req.body.titulo) {
        validaciones.push('Titulo es requerido');
    }    
    if (!req.body.valor) {
        validaciones.push('Valor es requerido');
    }
    if (!req.body.cliente) {
        validaciones.push('Cliente que requiere servicio es requerido');
    }
    if (!req.body.universidad) {
        validaciones.push('Universidad es requerido');
    }
    if (!req.body.tipoProyecto) {
        validaciones.push('Tipo Proyecto es requerido');
    }
    if (!req.body.etapas) {
        validaciones.push('Etapa es requerida');
    }
    return validaciones;
}

module.exports = {
    validarProyecto,
}