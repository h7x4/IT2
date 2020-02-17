/*
Om vi ser på tallene som trappetrinn, kan vi omdefinere problemet til at tallene
ikke må trappe ned to ganger i løpet av rekken. Enten må vi ta vekk det ene nedtrappet
eller så må vi ta vekk det andre, men vi står fortsatt alltid igjen med ett av dem.
*/

function almostIncreasingSequence(sequence) {
  let decreaseCounter = 0;
  for (elements in sequence){
    if (sequence[elements] > sequence[parseInt(elements) + 1]) {
      decreaseCounter++;
      if (decreaseCounter > 1) {
        return false;
      }
    }
  }
  return true;
}

/* Test */
console.log(`[1,3,2,1] -> ${almostIncreasingSequence([1,3,2,1])}`);
console.log(`[1,3,2] -> " + ${almostIncreasingSequence([1,3,2])}`);
console.log(`[1,3,2,4,5,6,8] -> " + ${almostIncreasingSequence([1,3,2,4,5,6,8])}`);
console.log(`[1,3,2,4,5,6,8,2] -> " + ${almostIncreasingSequence([1,3,2,4,5,6,8,2])}`);