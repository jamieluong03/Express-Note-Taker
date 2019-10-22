var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
// var savedText = {};

// A function for getting all notes from the db
var getNotes = function() {
    $.ajax({ url: "/api/notes", method: "GET" })
        .then(function(journalData){
            // console.log(journalData);

            for (var i=0; i < journalData.length; i++){
                var listNote = $("<li class='list-group-item mt-4'>");

                listNote.append(
                    $("<h5>").text(journalData[i].title),
                    $("<h5>").text(journalData[i].note)
                );

            $noteList.append(listNote);
            
            };
        })
};

// A function for saving a note to the db
// var saveNote = function(note) {
   

// };

// A function for deleting a note from the db
// var deleteNote = function(title) {
  
// };

// // If there is an activeNote, display it, otherwise render empty inputs
// var renderActiveNote = function() {
  
// };

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
};

// Delete the clicked note
var handleNoteDelete = function(event) {
  
};

// Sets the activeNote and displays it
// var handleNoteView = function() {
  
// };

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {
    // event.preventDefault();
    document.getElementsByTagName('form')[0].reset();

    // $.ajax({url: "/api/notes", method: "POST"})
    // .then(function(){
    //     $noteTitle.empty();
    //     $noteText.empty();
    // })
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
// var getAndRenderNotes = function() {
  
// };

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", getNotes);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
// getAndRenderNotes();
