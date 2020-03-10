const express = require("express");
const router = express.Router();
const Cliente = require("../cliente/Clientes");
const Produto = require("../produto/Produtos");
const Orcamento = require("../orcamento/Orcamentos");
const OrcamentoItens = require("../orcamentoItens/OrcamentoItens");
const adminAuth = require("../../middleware/adminAuth");

router.get("/orcamentoItens/:id", adminAuth,(req, res)=>{
    var idOrcamento = req.params.id;
    OrcamentoItens.findAll({
        where:{ orcamentoId: idOrcamento},
        include: [{model: Produto}]
    }).then(orcamentoItens=>{
        res.render("admin/orcamentoItens/index",{orcamentoItens:orcamentoItens,idOrcamento:idOrcamento});
    })
});

router.get("/orcamentoItens/new/:id", adminAuth, (req, res)=>{
    var idOrcamento = req.params.id;
    Produto.findAll().then(produtos=>{
        res.render("admin/orcamentoItens/new",{produtos: produtos, idOrcamento:idOrcamento});
    })
});

router.post("/orcamentoItens/save", (req, res)=>{
    var quantidade = req.body.quantidade;
    var valorUnitario = req.body.unitario;
    var valorTotal = req.body.total;
    var orcamentoId = req.body.orcamentoItens;
    var produtoId = req.body.produto;

    OrcamentoItens.create({
        quantidade: quantidade,
        valorUnitario:valorUnitario,
        valorTotal:valorTotal,
        orcamentoId:orcamentoId,
        produtoId:produtoId
    }).then(()=>{
        res.redirect("/orcamentoItens/"+orcamentoId);
    })
});

router.post("/orcamentoItens/delete", (req, res)=>{
    var id = req.body.id;
    
    if(id != undefined){
        if(!isNaN(id)){
            OrcamentoItens.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/orcamentos");
                console.log("Apagou");
            })
        }else{
            res.redirect("/orcamentos");
            console.log("Não-número");
        }
    }else{
        res.redirect("/orcamentos");
        console.log("Vazio");
    }
});

router.get("/orcamentos/visualizar/:id",  adminAuth, (req, res)=>{
    var id = req.params.id;
    Orcamento.findByPk(id, {include:[{model:Cliente}]}).then(orcamento=>{
        if(orcamento != undefined){
            OrcamentoItens.findAll({
                where:{ orcamentoId: id},
                include: [{model: Produto}]
            }).then(orcamentoItens=>{
                res.render("admin/orcamentos/visualizar",{orcamentoItens:orcamentoItens,orcamento:orcamento});
            });
        }else{
            res.redirect("/orcamentos");
        }
    }).catch(err=>{
        console.log(err);
        res.redirect("/");
    });
});

module.exports = router;


