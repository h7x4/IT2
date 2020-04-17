function createError(errorMessage) {
  const error = document.createElement("div");
  error.setAttribute('class', 'error');
  
  const errorBold = document.createElement("b");
  errorBold.innerHTML = 'ERROR:';
  error.appendChild(errorBold);

  errorBold.after(errorMessage);

  return error;
}