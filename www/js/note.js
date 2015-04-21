function NoteObject(noteData) {

	this.openNote = function() {

	  document.getElementById("txtTitle").value = self.title;
	  document.getElementById("txtBody").value = self.body;

	  //document.getElementById("editNote").style.display = "none";
	  //document.getElementById("viewNote").style.display = "inherit";
	}

	this.displayNote = function() {

	  document.getElementById("notesContainer").innerHTML += "<a href=\"#page2\" id=\"note" + self.noteID + "\">" + self.title + "</a><br />";
	  document.getElementById("note" + self.noteID).addEventListener(
	    "click",
	    function() {
	      self.openNote();
	    },
	    false
	  );
	}

	var self = this;

	self.noteID = noteData.noteID;
	self.title = noteData.title;
	self.body = noteData.body;

	self.displayNote();
}
