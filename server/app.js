var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( {extended: false } );

// require PG & connectionString for DB
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/Koala Holla';

var port = process.env.PORT || 8080;
// static folder
app.use( express.static( 'public' ) );

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});

// base url``
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( 'index.html' );
});

// get koalas
app.get( '/getKoalas', function( req, res ){
  console.log( 'getKoalas route hit' );
  pg.connect(connectionString, function(err, client, done){
    //check for error
    if(err){
      console.log(err);
    }//end error check
    else{
      console.log("connected to DB.");
      //array to hold results
      var koalasToSend = [];
      //Query the DB
      var queryResults = client.query('SELECT * From koala');
      //run for each row in the query
      queryResults.on("row", function(row){
        koalasToSend.push(row);
      }); //end of row
      queryResults.on('end', function(){
        //we're done
        done();
        //return result as JSON version of array
        return res.json(koalasToSend);

      });//end of end
    }// end of else
  });// end pg connect

});// end of get koalas

// add koala
app.post( '/addKoala', urlencodedParser, function( req, res ){
  console.log( 'addKoala route hit' );
  console.log('addKoalas: ', req.body);
  var newName = req.body.namer;
  var newAge = Number(req.body.age);
  var newSex = req.body.sex;
  var newTransfer = req.body.readyForTransfer;
  var newNotes = req.body.notes;

  pg.connect(connectionString, function(err, client, done){
    //check for error
    if(err){
      console.log(err);
    }//end error check
    else{
      console.log("connected to DB.");
      //array to hold results
      var koalasToSend = [];
      //send new Koala to DB
      client.query('INSERT INTO koala (koala_name, gender, age, ready_for_transfer, notes) VALUES ($1, $2, $3, $4, $5);', [newName, newSex, newAge, newTransfer, newNotes]);

      //Query the DB
      var queryResults = client.query('SELECT * From koala');
      //run for each row in the query
      queryResults.on("row", function(row){
        koalasToSend.push(row);
      }); //end of row
      queryResults.on('end', function(){
        //we're done
        done();
        //return result as JSON version of array
        return res.json(koalasToSend);

      });//end of end
    }// end of else
  });// end pg connect
});//end of post

// edit koala
app.post( '/editKoala', urlencodedParser, function( req, res ){
  console.log( 'editKoala route hit' );
  //assemble object to send
  console.log('addKoalas: ', req.body);
  var editName = req.body.namerEditIn;
  var editAge = Number(req.body.ageEditIn);
  var editSex = req.body.sexEditIn;
  var editTransfer = req.body.readyForTransferEditIn;
  var editNotes = req.body.notesEditIn;

  pg.connect(connectionString, function(err, client, done){
    //check for error
    if(err){
      console.log(err);
    }//end error check
    else{
      console.log("connected to DB.");
      //array to hold results
      var koalasToSend = [];
      //send new Koala to DB
      client.query('UPDATE koala (koala_name, gender, age, ready_for_transfer, notes) VALUES ($1, $2, $3, $4, $5);', [editName, editSex, editAge, newTransfer, newNotes]);

      //Query the DB
      var queryResults = client.query('SELECT * From koala');
      //run for each row in the query
      queryResults.on("row", function(row){
        koalasToSend.push(row);
      }); //end of row
      queryResults.on('end', function(){
        //we're done
        done();
        //return result as JSON version of array
        return res.json(koalasToSend);

      });//end of end
    }// end of else
  });// end pg connect

});
