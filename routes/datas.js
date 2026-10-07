const express = require('express');
const router = express.Router();

const db = require('../config/database');


// ========================================
// BUSCAR TODAS AS DATAS
// ========================================

router.get('/', async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM datas ORDER BY data_final ASC'
        );

        res.json(rows);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar as datas'
        });

    }

});


// ========================================
// GUARDAR NOVA DATA
// ========================================

router.post('/', async (req, res) => {

    try {

        const { data_final } = req.body;

        if (!data_final) {

            return res.status(400).json({
                sucesso: false,
                mensagem: 'A data final é obrigatória'
            });

        }


        const [resultado] = await db.query(
            'INSERT INTO datas (data_final) VALUES (?)',
            [data_final]
        );


        res.status(201).json({

            sucesso: true,

            mensagem: 'Data guardada com sucesso',

            id: resultado.insertId,

            data_final: data_final

        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({

            sucesso: false,

            mensagem: 'Erro ao guardar a data'

        });

    }

});


// ========================================
// APAGAR UMA DATA
// ========================================

router.delete('/:id', async (req, res) => {

    try {

        const { id } = req.params;


        const [resultado] = await db.query(
            'DELETE FROM datas WHERE id = ?',
            [id]
        );


        if (resultado.affectedRows === 0) {

            return res.status(404).json({

                sucesso: false,

                mensagem: 'Data não encontrada'

            });

        }


        res.json({

            sucesso: true,

            mensagem: 'Data apagada com sucesso'

        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({

            sucesso: false,

            mensagem: 'Erro ao apagar a data'

        });

    }

});


module.exports = router;