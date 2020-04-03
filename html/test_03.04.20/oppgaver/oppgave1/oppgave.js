// @ts-check

/* Initialize variables */

const animals = [
  {
    sound: './sound/silence.mp3',
    image: {
      link: './images/giraffe.jpg',
      src: 'https://pixabay.com/photos/giraffe-portrait-safari-4312090/',
    },
    name: 'Giraffe',
    info: 'This is a giraffe. It has a long neck',
  },
  {
    sound: './sound/lion.mp3',
    image: {
      link: './images/lion.jpg',
      src:
        'https://pixabay.com/photos/african-lion-lion-male-mane-lazy-951778/',
    },
    name: 'Lion',
    info: 'This is a lion. It can bite you',
  },
  {
    sound: './sound/dog.mp3',
    image: {
      link: './images/dog.jpg',
      src: 'https://pixabay.com/photos/dog-labrador-light-brown-pet-1210559/',
    },
    name: 'Dog',
    info: "This is a dog. It's so cute",
  },
  {
    sound: './sound/cow.mp3',
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
const soundButton = document.getElementById('soundButton');
const newAnimalButton = document.getElementById('changeAnimal');
const audioError = document.getElementById('error1');

/* Add event listeners */

soundButton.addEventListener('click', () => sound.play());
newAnimalButton.addEventListener('click', setAnimal);

/* Initialize HTML with functions */

image.style.width = '1280px';
image.style.height = '720px';

setAnimal();

/* Functions */

function setAnimal() {
  audioError.innerHTML = ''; // clear error message

  animal = animals[Math.floor(Math.random() * 4)];
  image.setAttribute('src', animal.image.link);
  imageSource.innerHTML = `Image source: ${animal.image.src}`;
  sound.setAttribute('src', animal.sound);
  if (animal.sound === './sound/silence.mp3') {
    const error = createError('This animal has no sound that a human can hear'); //Global function. Can be found at resources/js/error.js
    audioError.appendChild(error);
  }
  animalName.innerHTML = animal.name;
  info.innerHTML = animal.info;
}
