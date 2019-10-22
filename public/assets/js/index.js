var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $("#tableData");

// activeNote is used to keep track of the note in the textarea
// var savedText = {};

// A function for getting all notes from the db
var getNotes = function(journalData) {
   $noteTitle = journalData.title;
   $noteText = journalData.note;
};

// A function for saving a note to the db
// var saveNote = function(note) {};

// A function for deleting a note from the db
// var deleteNote = function(title) {};

// // If there is an activeNote, display it, otherwise render empty inputs
// var renderActiveNote = function() {};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
//   event.preventDefault();
  var savedText = {
      title: $noteTitle.val().trim(),
      note: $noteText.val().trim()
  };

//   activeNote.push(savedText);
  console.log(savedText);

  $.post("/api/notes", savedText,
  function(){
      $noteTitle.val();
      $noteText.val();
  });
  document.getElementsByTagName('form')[0].reset();

  // empties the div
  $noteList.empty();

  // recreates the div
  getAndRenderNotes();
};

// Delete the clicked note
var handleNoteDelete = function(event) {
  
};

// Sets the activeNote and displays it
// var handleNoteView = function() {
  
// };

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {

    document.getElementsByTagName('form')[0].reset();

};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  if ($noteText.val() == ""){
      $(".save-note").attr("style", "display:none");
  } else {
      $(".save-note").attr("style", "display:inline-block");
  }
};

// Render's the list of note titles
// var renderNoteList = function(notes) {
  
// };

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
    $.ajax({ url: "/api/notes", method: "GET" })
    .then(function(journalData){
        console.log(journalData);
        console.log($noteList);

        for (var i=0; i < journalData.length; i++){
            var listNote = $("<li class='list-group-item mt-4'>");
            listNote.append(
                $("<button class='far fa-trash-alt float-right delete-note'>"),
                $("<h4>").text(journalData[i].title),
                // $("<h4>").text(journalData[i].note)
            );

        $noteList.append(listNote);
        
        };
        $noteList.append(journalData);
    })
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", getNotes);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
