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
	  "caesarcipherDB",
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
	var i = 0;

	while (i < results.rows.length) {

	  document.getElementById("notesContainer").innerHTML += "<a href=\"#page2\" id=\"note" + i + "\">note " + i + "</a><br />";
	  document.getElementById("note" + i).addEventListener(
	    "click",
	    function() {
	      openNote(results.rows.item(i));
	    },
	    false
	  );

	  window.alert(results.rows.item(i).noteID);
	  i++;
	}
}

function createNotesTable(database) {

	/*sql = "DROP TABLE IF EXISTS notes;";

	database.executeSql(sql, [], onSQLSuccess, onSQLError);*/

	sql = "CREATE TABLE IF NOT EXISTS notes("
	  + "noteID INTEGER NOT NULL PRIMARY KEY,"
	  + "title TEXT NOT NULL,"
	  + "body TEXT NOT NULL);";

	database.executeSql(sql, [], onSQLSuccess, onSQLError);

	/*sql = "INSERT INTO notes (noteID, title, body) VALUES (?, ?, ?);"

	database.executeSql(
	  sql,
	  [
	    1,
	    "Welcome!",
	    "Beginner note."
	  ],
	  onSQLSuccess,
	  onSQLError
	);*/
}

function readNotesList(database) {

	sql = "SELECT noteID, title FROM notes;";

	database.executeSql(sql, [], onReadNotesListSuccess, onSQLError);
}

function insertNote(database) {

	var titleText = document.getElementById("txtTitle").value;
	var bodyText = document.getElementById("txtBody").value;

	sql = "INSERT INTO notes (title, body) VALUES(?, ?);";

	database.executeSql(
	  sql,
	  [
	    titleText,
	    bodyText
	  ],
	  onSQLSuccess,
	  onSQLError
	);
}

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
	  "caesarcipherDB",
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

	//document.getElementById("viewNote").style.display = "none";
	//document.getElementById("editNote").style.display = "inherit";
}

function openNote(note) {

	document.getElementById("txtTitle").value = note.title;
	document.getElementById("txtBody").value = note.body;

	//document.getElementById("editNote").style.display = "none";
	//document.getElementById("viewNote").style.display = "inherit";
}

function finishNote() {

	var database = window.openDatabase(
	  "caesarcipherDB",
	  "1.0",
	  "caesarcipherDB",
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
