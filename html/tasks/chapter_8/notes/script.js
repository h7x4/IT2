// @ts-check

/* Register HTML DOM elements by variables */

const noteForm = document.getElementById('noteInput');
const noteText = document.getElementById('noteInputText');
const noteSubmit = document.getElementById('noteInputSubmit');
const notes = document.getElementById('notes');
const error1 = document.getElementById('errorHolder');

/* Add event listeners */

noteForm.addEventListener('submit', addNote);

/* Initialize HTML with functions */

notes.innerHTML = localStorage.getItem('notes');
jQuery('button').click('click', buttonDelete);

/* Functions */

function addNote(evt) {
  evt.preventDefault();

  error1.innerHTML = '';

  if (noteText.value === '') {
    const error = createError('Add notes into the textarea');
    error1.appendChild(error);
    return;
  }

  const text = noteText.value;
  noteText.value = '';

  const noteBox = document.createElement('div');
  noteBox.setAttribute('class', 'gridElement');

  const note = document.createElement('p');
  note.innerHTML = text;

  const button = document.createElement('button');
  button.innerHTML = '🗑️';
  button.setAttribute('class', 'hoverable');
  button.addEventListener('click', buttonDelete);

  noteBox.appendChild(note);
  noteBox.appendChild(button);
  notes.appendChild(noteBox);

  localStorage.setItem('notes', notes.innerHTML);
}

function buttonDelete(evt) {
  evt.currentTarget.parentNode.parentNode.removeChild(evt.currentTarget.parentNode);
  localStorage.setItem('notes', notes.innerHTML);
}

function createError(errorMessage) {
  const error = document.createElement("div");
  error.setAttribute('class', 'error');
  
  const errorBold = document.createElement("b");
  errorBold.innerHTML = 'ERROR:';
  error.appendChild(errorBold);

  errorBold.after(errorMessage);

  return error;
}
