const express = require('express');
const cors = require('cors');
require('dotenv').config();

const datasRoutes = require('./routes/datas');

const app = express();


// Permitir comunicação com o Angular
app.use(cors());


// Permitir receber JSON
app.use(express.json());


// Rota principal
app.get('/', (req, res) => {

    res.json({
        mensagem: 'API do Calendário funcionando!',
        banco: 'MySQL'
    });

});


// Rotas das datas
app.use('/api/datas', datasRoutes);


// Porta
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(`Servidor funcionando em http://localhost:${PORT}`);

});