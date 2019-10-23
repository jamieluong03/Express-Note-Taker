var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $("#tableData");


// A function for getting all notes from the db
var getNotes = function() {
    var selectedNote = $(this).attr("data-name");
    console.log(selectedNote);

    $.get("/api/notes", function(data){
        for (var i=0; i< data.length; i++){
            if (data[i].title === selectedNote){
             $noteTitle.val(data[i].title);
             $noteText.val(data[i].note);   
            }
        }
    })
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
  var savedText = {
      title: $noteTitle.val().trim(),
      note: $noteText.val().trim()
  };

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
var handleNoteDelete = function() {
    var selectedNote = $(this).attr("id");

    $.ajax ({ url: "/api/notes/" + selectedNote, 
    method: "DELETE"});
    $noteList.empty();

    getAndRenderNotes();

};


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

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
    $.ajax({ url: "/api/notes", method: "GET" })
    .then(function(journalData){
        console.log(journalData);
        console.log($noteList);

        for (var i=0; i < journalData.length; i++){
            var listNote = $("<li class='list-group-item mt-4'>");
            listNote.attr("data-name", journalData[i].title);
            listNote.append(
                $("<button class='far fa-trash-alt float-right delete-note' id="+ journalData[i].title + ">"),
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
