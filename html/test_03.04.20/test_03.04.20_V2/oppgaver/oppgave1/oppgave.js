// @ts-check

/* Initialize variables */

const animals = [
  {
    sound: {
      link: './sound/silence.mp3'
    },
    image: {
      link: './images/giraffe.jpg',
      src: 'https://pixabay.com/photos/giraffe-portrait-safari-4312090/',
    },
    name: 'Giraffe',
    info: 'This is a giraffe. It has a long neck',
  },
  {
    sound: {
      link: './sound/lion.mp3',
      src: 'Soundbible'
    },
    image: {
      link: './images/lion.jpg',
      src:
        'https://pixabay.com/photos/african-lion-lion-male-mane-lazy-951778/',
    },
    name: 'Lion',
    info: 'This is a lion. It can bite you',
  },
  {
    sound: {
      link: './sound/dog.mp3',
      src: 'Soundbible'
    },
    image: {
      link: './images/dog.jpg',
      src: 'https://pixabay.com/photos/dog-labrador-light-brown-pet-1210559/',
    },
    name: 'Dog',
    info: "This is a dog. It's so cute",
  },
  {
    sound: {
      link: './sound/cow.mp3',
      src: 'Soundbible'
    },
    image: {
      link: './images/cow.jpg',
      src:
        'https://pixabay.com/photos/cow-head-cow-head-animal-livestock-1715829/',
    },
    name: 'Cow',
    info: 'This is a cow. It goes moooooooo',
  },
];

let animal;

/* Register HTML DOM elements by variables */

const animalName = document.getElementById('animalName');
const image = document.getElementById('animalImage');
const imageSource = document.getElementById('imageSource');
const info = document.getElementById('animalInfo');
const sound = document.getElementById('animalAudio');
const soundSource = document.getElementById("soundSource");
const soundButton = document.getElementById('soundButton');
const newAnimalButton = document.getElementById('changeAnimal');
const audioError = document.getElementById('error1');

/* Add event listeners */

soundButton.addEventListener('click', () => sound.play());
newAnimalButton.addEventListener('click', setAnimal);

/* Initialize HTML with code */

newAnimalButton.style.padding = '20px 30px';
soundButton.style.padding = '15px 30px';

setAnimal();

/* Functions */

function setAnimal() {
  audioError.innerHTML = ''; // clear error message

  /* Choose random animal */
  animal = animals[Math.floor(Math.random() * animals.length)];

  /* Set HTML  */
  image.setAttribute('src', animal.image.link);
  imageSource.innerHTML = `Image source: ${animal.image.src}`;
  sound.setAttribute('src', animal.sound.link);
  if (animal.sound.link === './sound/silence.mp3') {
    const error = createError('This animal has no sound that a human can hear'); //Global function. Can be found at resources/js/error.js
    error.style.width='80%';
    audioError.appendChild(error);
    soundSource.innerHTML = 'Audio source: ';
  } else {
  soundSource.innerHTML = `Audio source: ${animal.sound.src}`;
  }
  animalName.innerHTML = animal.name;
  info.innerHTML = animal.info;
}
