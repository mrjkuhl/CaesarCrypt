document.addEventListener("deviceready", onDeviceReady, false);

function onSQLSuccess() {

	console.log("Success.");
	window.alert("Success.");
}

function onSQLError(errorObject) {

	console.log("Error.");
	window.alert("Error: " + errorObject.code + ", " + errorObject.message + ".");
}

function onCreateNotesTableSuccess() {

	var database = window.openDatabase(
	  "caesarcipherDB",
	  "1.0",
	  "notes",
	  1024 * 1024 * 10
	);

	database.transaction(
	  readNotesList,
	  onSQLError,
	  onSQLSuccess
	);
}
function onReadNotesListSuccess(transaction, results) {

	//window.alert("Notes read: " + results.rows.length + ".");
	/*var i = 1;

	while (i <= results.rows.length) {

	  document.getElementById("notesContainer").innerHTML += "<a href=\"#page2\" id=\"note" + i + "\">note " + i + "</a><br />";
	  document.getElementById("note" + i).addEventListener(
	    "click",
	    function() {
	      openNote(i);
	    },
	    false
	  );

	  //window.alert(results.rows.item(i).noteID);
	  i++;
	}*/
}

function createNotesTable(database) {

	//sql = "DROP TABLE IF EXISTS notes;";
	sql = "CREATE TABLE IF NOT EXISTS notes("
	  + "noteID INT PRIMARY KEY,"
	  + "title TEXT NOT NULL,"
	  + "body TEXT NOT NULL);";

	database.executeSql(sql, [], onSQLSuccess, onSQLError);
}

function readNotesList(database) {

	sql = "SELECT noteID, title FROM notes;";

	database.executeSql(sql, [], onReadNotesListSuccess, onSQLError);
}

function insertNote(database) {

	sql = "INSERT INTO notes (noteID, title, body) VALUES(?, ?, ?);";

	database.executeSql(
	  sql,
	  [
	    1,
	    document.getElementById("txtTitle").value,
	    document.getElementById("txtBody").value
	  ],
	  onSQLSuccess,
	  onSQLError
	);
}

/*
function saveNote() {
} */

function onDeviceReady() {

	document.getElementById("btnNew").addEventListener(
	  "click",
	  newNote,
	  false
	);

	document.getElementById("btnDone").addEventListener(
	  "click",
	  finishNote,
	  false
	);

	document.getElementById("btnCancel").addEventListener(
	  "click",
	  cancelNote,
	  false
	);

	var database = window.openDatabase(
	  "caesarcipherDB",
	  "1.0",
	  "notes",
	  1024 * 1024 * 10
	);

	database.transaction(
	  createNotesTable,
	  onSQLError,
	  onCreateNotesTableSuccess
	);
}

function newNote() {
	document.getElementById("txtTitle").value = "";
	document.getElementById("txtBody").value = "";

	document.getElementById("viewNote").style.display = "none";
	document.getElementById("editNote").style.display = "inherit";
}

function openNote(noteID) {

	document.getElementById("txtTitle").value = "";
	document.getElementById("txtBody").value = "";

	document.getElementById("editNote").style.display = "none";
	document.getElementById("viewNote").style.display = "inherit";
}

function finishNote() {

	var database = window.openDatabase(
	  "caesarcipherDB",
	  "1.0",
	  "notes",
	  1024 * 1024 * 10
	);

	database.transaction(
	  insertNote,
	  onSQLError,
	  onSQLSuccess
	);
}

function cancelNote() {

	document.getElementById("txtTitle").value = "";
	document.getElementById("txtBody").value = "";
}
