const express = require('express');
const { getConnection } = require('./databases/configuration');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

getConnection();

// Parseo JSON
app.use(express.json());

app.use('/cliente', require('./routes/cliente'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
