const Sequelize = require("sequelize");
const connection = require("../../database/database");

const OrcamentoItens = connection.define('orcamentoItens',{
    produto:{
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade:{
        type: Sequelize.BIGINT,
        allowNull: false
    },
    valor:{
        type: Sequelize.DECIMAL,
        allowNull: false
    }
})

OrcamentoItens.sync({force:false});

module.exports = OrcamentoItens;