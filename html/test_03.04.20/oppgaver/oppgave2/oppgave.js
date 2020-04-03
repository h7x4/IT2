// @ts-check

/* Initialize variables */

const houseValueMax = 10000000;

/* Register HTML DOM elements by variables */

const form = document.getElementById('input');
const houseValue = document.getElementById('houseValue');
const rentSum = document.getElementById('rentingSum');
const submitButton = document.getElementById('submit');
const formError = document.getElementById('error1');
const result = document.getElementById('result');

/* Add event listeners */

form.addEventListener('submit', evt => {
  evt.preventDefault();
  formError.innerHTML = '';

  const house = parseInt(houseValue.value);
  const rent = parseInt(rentSum.value);

  /* Error checking
   *  I'm aware that I could've just used max and min for checking some of the errors
   *  but I wanted the error format to be consistent.
   */
  try {
    if (house > houseValueMax) throw `Boligverdien kan ikke være større enn ${houseValueMax}kr`;
    if (rent > house) throw 'Lånesummen kan ikke være større enn boligverdien';
    if (house <= 0) throw 'Boligverdi må være større enn 0';
    if (rent <= 0) throw 'Lånesum må være større enn 0';
    if (isNaN(house)) throw 'Fyll ut Boligverdi';
    if (isNaN(rent)) throw 'Fyll ut lånesum';
  } catch (error) {
    result.innerHTML = '';
    const errorMessage = createError(error);
    formError.appendChild(errorMessage);
    return;
  }

  /* Result based on input */

  if (rent < 0.75 * house) {
    result.innerHTML = 'Renten er satt til 2,29%';
    return;
  }

  if (rent >= 0.75 * house && rent < 0.9 * house) {
    result.innerHTML = 'Renten er satt til 2,49%';
    return;
  }

  if (rent >= 0.9 * house) {
    result.innerHTML = 'Renten er satt til 2,69% og du må ha en kausjonist';
    return;
  }
});
