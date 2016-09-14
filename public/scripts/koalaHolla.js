console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    var newKoala = {
      namer: $('#nameIn').val(),
      age: $('#ageIn').val(),
      sex: $('#sexIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };
    // call saveKoala with the new obejct
    saveKoala( newKoala );
  }); //end addButton on click
  //edit koala on click
  $("#editButton").on('click', function(){
    console.log("in edit on click");
    var editedKoala = {
      namerEditIn: $('#nameEditIn').val(),
      ageEditIn: $('#ageEditIn').val(),
      sexEditIn: $('#sexEditIn').val(),
      readyForTransferEditIn: $('#readyForTransferEditIn').val(),
      notesEditIn: $('#notesEditIn').val()
    }; //end editKoala
      //call edit koala
    editKoala();
  });// end edit on click


}); // end doc ready

var getKoalas = function(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/getKoalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
}; // end getKoalas

var saveKoala = function( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/addKoala',
    type: 'post',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
    } // end success
  }); //end ajax
};

var editKoala = function(){
  console.log("in edit koala");
  //ajax call to edit koalas
  $.ajax({
    url: '/editKoala',
    type: 'post',
    data: editedKoala,
    success: function( data ){
      console.log( 'edited some koalas: ', data );
    } // end success
  }); //end ajax
};

};
