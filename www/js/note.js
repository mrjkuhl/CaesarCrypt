function NoteObject(noteID, cipher, database) {

	this.getData = function(tx, field) {

	  var sql = "SELECT title, body FROM notes WHERE noteID = " + this.noteID;

	  tx.executeSql(sql, [], onSQLSucces, onSQLError());
	}

	this.onSQLError = function(errorObject) {

	  if(errorObject) {

	    console.log("Transaction failed. Error code: " + errorObject.code);
	  }

	  else {

	    console.log("Unknown error.");
	  }
	}

	this.onSQLSuccess = function() {

		console.log("Transaction successful.");
	}

	this.getTitle = function() {

	  this.database.transaction(
	    this.getData,
	    this.onSQLError,
	    this.onSQLSuccess
	  );
	}

	this.getBody = function() {
	}

	this.decryptTitle = function() {
	}

	this.decryptBody = function() {
	}

	this.noteID = noteID;
	this.database = database;
	this.title;
	this.body;

	this.decryptTitle();
	this.decryptBody();
}
