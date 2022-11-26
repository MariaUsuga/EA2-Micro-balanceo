const express = require('express');
const { getConnection } = require('./databases/configuration');
const cors = require('cors');

const app = express();
const port = 4001;

app.use(cors());

getConnection();

// Parseo JSON
app.use(express.json());

app.use('/cliente', require('./routes/cliente'));
app.use('/etapas', require('./routes/etapas'));
app.use('/universidad', require('./routes/universidad'));
app.use('/tipoproyecto', require('./routes/tipoproyecto'));
app.use('/proyecto', require('./routes/proyecto'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
