
global.db = require('./db')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;   //porta padrão

app.use( require( 'cors' )());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// definindo rotas
const router = express.Router()
router.get('/', (req,res) => res.json({ message: 'Funcionando!'}));
app.use('/',router)

// GET /clientes
router.get( '/clientes', ( req, res ) =>
    global.db.findCustomers( ( err, docs ) => {
        if( err ) res.status( 500 ).json( err )
        else res.json( docs )
}))

// GET /clientes/{id}
router.get( '/clientes/:id', ( req, res ) =>
    global.db.findCustomer( req.params.id, ( err, docs ) => {
        if( err ) res.status( 500 ).json( err )
        else res.json( docs )
}))

/* POST /clientes. */
router.post('/clientes', function( req, res ) {
    
    const customer = req.body;
    global.db.insertCustomer(customer, ( err, result ) => {
        if( err ) res.status( 500 ).json( err )
        else res.json({ message: 'Cliente cadastrdo com sucesso!'})
    })
});
// para testar copiar e colar no ps ou linux:
// curl -X POST -d "{'nome':'Curl', 'idade':11, 'uf':'RJ'}" http://localhost:3000/clientes

/* PUT /clientes/{id} */
router.put('/clientes/:id', function(req, res) {
    const id        =   req.params.id;
    const customer  =   req.body;
       
    global.db.updateCustomer(id, customer, (err,result) => {
        if( err ) res.status( 500 ).json( err )
        else res.json({ message: 'Cliente atualizado com sucesso!'})
    });
});

/* PATCH /clientes/{id} */
router.patch( '/clientes/:id', function( req, res ) {
    const id        =   req.params.id;
    const customer  =   req.body;
       
    global.db.updateCustomer(id, customer, ( err, result ) => {
        if( err ) res.status( 500 ).json( err )
        else res.json( { message: 'Cliente atualizado com sucesso!' } )
    });
});

/* GET delete page */
router.delete( '/clientes/:id', function( req, res ){
    var id = req.params.id
   
    global.db.deleteCustomer( id, ( err, result )=>{
        if( err ) res.status( 500 ).json( err )
        else res.json( { message: 'Cliente excluído com sucesso!' } )
    })
});


//inicia o servidor
app.listen(port)
console.log('API funcionando!')