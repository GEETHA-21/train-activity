var firebaseConfig = {
  apiKey: "AIzaSyCwYamR12EG0ouFM7FdbXjA-LEV3_m7qaU",
  authDomain: "train-activity-9380b.firebaseapp.com",
  databaseURL: "https://train-activity-9380b.firebaseio.com",
  projectId: "train-activity-9380b",
  storageBucket: "train-activity-9380b.appspot.com",
  messagingSenderId: "156413595898",
  appId: "1:156413595898:web:2db2b53a784da9f66e3943"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var trainData = firebase.database();

$("#addTrainBtn").on("click", function() {
  var trainName = $("#trainNameInput")
    .val()
    .trim();
  var destination = $("#destinationInput")
    .val()
    .trim();
  var firstTrain = moment(
    $("#firstTrainInput")
      .val()
      .trim(),
    "HH:mm"
  )
    .subtract(10, "years")
    .format("X");
  var frequency = $("#frequencyInput")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  trainData.ref().push(newTrain);

  alert("Train Added!");

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");
  return false;
});

trainData.ref().on("child_added", function(snapshot) {
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
  var minutes = frequency - remainder;
  var arrival = moment()
    .add(minutes, "m")
    .format("hh:mm A");

  $("#trainTable > tBody").append(
    "<tr><td>" +
      name +
      "</td><td>" +
      destination +
      "</td><td>" +
      frequency +
      "</td><td>" +
      arrival +
      "</td><td>" +
      minutes +
      "</td></tr>"
  );
});
