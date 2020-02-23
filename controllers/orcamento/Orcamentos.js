const Sequelize = require("sequelize");
const connection = require("../../database/database");

const OrcamentoItens = require("../orcamentoItens/OrcamentoItens");

const Orcamento = connection.define('orcamentos',{
    cliente:{
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    formPagamento:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    aprovado:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

Orcamento.hasMany(OrcamentoItens);

Orcamento.sync({force:false});

module.exports = Orcamento;