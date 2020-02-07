$(document).ready(function () {

  $('table.display').DataTable();

var config = {
  apiKey: "AIzaSyACrcntm-cwMvlB4usP2rcByHIBWlr7EWs",
  authDomain: "smsalumnihomecoming2020.firebaseapp.com",
  databaseURL: "https://smsalumnihomecoming2020.firebaseio.com/",
  storageBucket: "smsalumnihomecoming2020.appspot.com",
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

var initial_value = 0;
var counter = initial_value;

var guests = [ {id: 0, name: "Brian Palac", batch: "1995", party: 1},
{id: 1, name: "Nick Caskey", batch: "1996", party: 2}, {id: 2, name: "Amy Li", batch: "1997", party: 1},
{id: 3, name: "Daria Wu", batch: "1998", party: 1}, {id: 4, name: "Aileen Choi", batch: "1999", party: 1},
{id: 5, name: "Roland Rivera", batch: "Faculty/Staff", party: 1}, {id: 6, name: "Gloria Bonite", batch: "2000", party: 2}
]

$("#registered").text(counter);
$("#total").html(guests.length);

  // logContainer holds all of our guests
  var logContainer = $("#guests");

  displayAll(guests);

  $(document).on("click", ".register", handleRegister);
  $(document).on("click", ".view", switch_table);

  function displayAll(guests) {
    //logContainer.empty();

    for (let i = 0; i < guests.length; i++) {
      logContainer.append(
          "<tr><td>" + guests[i].name + "</td>"
        + "<td>" + guests[i].batch + "</td>"
        + "<td>" + guests[i].party + "</td>"
        + "<td><button type='button' class='btn btn-success register' data-id1='" + guests[i].id + "'>Register</button></td>" +
        "</tr>");
    }

    $('#tableA').DataTable({
      scrollY: 400,
      "columnDefs": [
        { "orderable": false, "targets": 2 },
        { "orderable": false, "targets": 3 }
      ]
    });

  }

  function handleRegister() {
    var currentGuest = $(this).data("id1");
    RegisterGuest(currentGuest);
  }

  function switch_table() {
    var number = $(this).data("id2");
    switch (number) {
      case 1:
        $("#table").css("display", "");
        $("#table2").css("display", "none");
        break;
      case 2:
        $("#table").css("display", "none");
        $("#table2").css("display", "");
        break;
    }
  }

  function RegisterGuest(id) {

      var currentGuest = {
      name: guests[id].name,
      batch: guests[id].batch,
      party: guests[id].party,
    };

    if(currentGuest.batch !== "1995" && currentGuest.batch !== "Faculty/Staff") {
      alert("Please collect payment of ₱ 250. Click ok when done.");
    }
     
    database.ref("/register").push(currentGuest);

    alert("Guest was successfully registered! Please provide guest with badge and ticket.");

    console.log(counter);

    if (counter === guests.length) 
      alert("All guests have been registered!");
    
    counter++;

    database.ref("/count").set({
      counter: counter
    });
    
    $("#table").css("display", "none");
    $("#table2").css("display", "");
  }


    database.ref("/register").on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var GuestName = childSnapshot.val().name;
    var GuestBatch = childSnapshot.val().batch;
    var GuestParty = childSnapshot.val().party;
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(GuestName),
      $("<td>").text(GuestBatch),
      $("<td>").text(GuestParty)
    );
  
    // Append the new row to the table
    $("#guests2").append(newRow);
  });

  database.ref("/count").on("value", function(snapshot) {

    counter = snapshot.val().counter;
  
    console.log(counter);

    $("#registered").text(counter);

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  
});

