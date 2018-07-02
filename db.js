const mongoClient   = require( "mongodb" ).MongoClient;
const ObjectId      = require( "mongodb" ).ObjectId;

// mongodb:usuario:senha@servidor:porta/banco
//const new = false, edit = false, delete = false;

mongoClient.connect( "mongodb://localhost:27017/workshop" )
    .then( conn => global.conn = conn.db( "workshop" ) )
    .catch( err => console.log( err ) )

function findCustomers( callback ) {
    global.conn.collection( 'customers').find().toArray( callback )
}


function findCustomer( id, callback ) {
    global.conn.collection( 'customers' ).findOne( new ObjectId( id ), callback );
}

function insertCustomer( customer,callback ) {
    global.conn.collection( "customers" ).insert( customer,callback );
}

function updateCustomer( id, customer, callback ) {
    global.conn.collection( "customers" ).update( { _id:new ObjectId( id ) }, customer, callback);
}

function patchCustomer( id, updates, callback ) {
    global.conn.collection( 'customers' ).update( { _id:new ObjectId( id ) }, { $set:updates }, callback)
}

function deleteCustomer (id, callback ){
    global.conn.collection("customers").deleteOne({_id:new ObjectId(id)}, callback);
}
 

module.exports = { findCustomers, findCustomer, insertCustomer, 
                updateCustomer, patchCustomer, deleteCustomer  } 
// 