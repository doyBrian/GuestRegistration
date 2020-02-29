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
var total = 0;

var guests = [ {id: 0, name: "Brian Palac", batch: "1995", party: 1},
{id: 1, name: "Nice Paulate", batch: "1995", party: 1}, {id: 2, name: "Luisita Gangging Maandig", batch: "Faculty/Staff", party: 1},
{id: 3, name: "Cheryl Uy-Ang", batch: "1995", party: 1}, {id: 4, name: "Erlinda Estrella Reyes", batch: "1995", party: 2},
{id: 5, name: "Roland Rivera", batch: "Faculty/Staff", party: 1}, {id: 6, name: "Gloria Bonite", batch: "Faculty/Staff", party: 2},
{id: 7, name: "Shalum Ubaub Lleno", batch: "1995", party: 1}, {id: 8, name: "Susan Grace Garcia", batch: "1995", party: 1},
{id: 9, name: "Ken Xavier", batch: "1995", party: 1}, {id: 10, name: "Cherryl Sue Abuzo", batch: "1995", party: 2},
{id: 11, name: "Allene May Alamban-Ansaldo", batch: "2001", party: 1}, {id: 12, name: "Vida Guce", batch: "1995", party: 1},
{id: 13, name: "Jules Salubre", batch: "1995", party: 1}, {id: 14, name: "Noel Silan", batch: "Faculty/Staff", party: 2},
{id: 15, name: "Rommel Joseph Quijano", batch: "1995", party: 2}, {id: 16, name: "Kerville Ignatius Balandra", batch: "1995", party: 1},
{id: 17, name: "Cherry Mae Castrodes", batch: "1995", party: 1}, {id: 18, name: "Carla V. Gonzales", batch: "1995", party: 1},
{id: 19, name: "Frederick Kho", batch: "1995", party: 1}, {id: 20, name: "Annaliza Quilang", batch: "1995", party: 2},
{id: 21, name: "Alberto Camaddo", batch: "1995", party: 1}, {id: 22, name: "Aileen Choi Go", batch: "1995", party: 1},
{id: 23, name: "Napoleon Palo", batch: "1995", party: 1}, {id: 24, name: "Asterie-Tabor Revelo", batch: "1995", party: 1},
{id: 25, name: "Mayraflor Lingcayo", batch: "1995", party: 1}, {id: 26, name: "Vener Agnes", batch: "1995", party: 1},
{id: 27, name: "Marilou Costello", batch: "Faculty/Staff", party: 1}, {id: 28, name: "Maggie Costello", batch: "Faculty/Staff", party: 2},
{id: 29, name: "Alex Gaane", batch: "Faculty/Staff", party: 2}, {id: 30, name: "Valerie Joan Espera-Garcia", batch: "Faculty/Staff", party: 2},
{id: 31, name: "Jed Jaranilla", batch: "1997", party: 1}, {id: 32, name: "Marie Antonette Emata", batch: "1997", party: 1},
{id: 33, name: "Arturo Ubaub Jr.", batch: "1997", party: 1}, {id: 34, name: "Venus Imelie Y. Tagub", batch: "1997", party: 1},
{id: 35, name: "Honey Roa", batch: "1996", party: 1}, {id: 36, name: "Patrick Jose B. Roa", batch: "1996", party: 1},
{id: 37, name: "JC Pineda", batch: "1997", party: 1}, {id: 38, name: "Janice Kate Igana", batch: "1994", party: 1},
]

var registered = [];

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

        total = total + guests[i].party;
    }

    $("#registered").text(counter);
    $("#total").html(total);

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
    if (registered.indexOf(currentGuest) < 0) {
      registered.push(currentGuest);
      RegisterGuest(currentGuest);
    }
    else  
      alert("Guest has already been registered.");
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

    counter = counter + currentGuest.party;

    if (counter === total) 
      alert("All guests have been registered!");

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

