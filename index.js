const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser"); //Importando Body Parser
const connection = require("./database/database.js");
const adminAuth = require("./middleware/adminAuth");

const usersController = require("./controllers/users/UsersController");
const produtosController = require("./controllers/produto/ProdutosController");
const clientesController = require("./controllers/cliente/ClientesController");
const fornecedoresController = require("./controllers/fornecedor/FornecedoresController");
const orcamentosController = require("./controllers/orcamento/OrcamentosController");
const orcamentoItensController = require("./controllers/orcamentoItens/OrcamentoItensController");


const User = require("./controllers/users/Users");
const Produtos = require("./controllers/produto/Produtos");
const Clientes = require("./controllers/cliente/Clientes");
const Fornecedores = require("./controllers/fornecedor/Fornecedores");
const Orcamento = require("./controllers/orcamento/Orcamentos");
const OrcamentoItens = require("./controllers/orcamentoItens/OrcamentoItens");

// View engine
app.set('view engine','ejs');

//Sessions
app.use(session({
    secret: "youshallnotpass", cookie: { maxAge: 14400000},
    saveUninitialized: true,
    resave: true
}))

//Arquivos estaticos
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
connection.authenticate()
    .then(()=>{
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

app.use("/", usersController);
app.use("/", produtosController);
app.use("/", clientesController);
app.use("/", fornecedoresController);
app.use("/", orcamentosController);
app.use("/", orcamentoItensController);


// Router
app.get("/", adminAuth, (req, res) => {
    res.render("index.ejs");
})

// End Router
app.listen(3000, () => {
    console.log("O servidor está rodando!")
})
