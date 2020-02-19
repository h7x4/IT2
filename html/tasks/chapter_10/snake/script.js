/* Initialize variables */
const pixelSize = 20; //Cannot be odd
let pixelAmount = 20;
let score = 0;
if (localStorage.highscore) {
  var highscore = localStorage.highscore; //TODO: global let inside if statement?
} else {
  highscore = 0;
}

/* Register HTML DOM elements by variables */
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start'); //TODO: Add canvas size selector, score, higscore,
const pixelAmountInput = document.getElementById('pixelAmount');
const pixelAmountForm = document.getElementById('pixelAmountForm');

/* Initialize HTML */
canvas.style.display = 'block';
ctx.canvas.width = ctx.canvas.height = (pixelAmount + 1) * pixelSize;
canvas.style.backgroundColor = '#ffffff';

/* Snake object */
const snake = {
  direction: 'right',
  color: '#00ff00',
  tail: [
    [3, 0],
    [2, 0],
    [1, 0],
    [0, 0],
  ],

  /* Draw the snake by the tail array */
  draw() {
    ctx.fillStyle = this.color;

    const clearPosition = this.tail.pop().map(point => point * pixelSize);
    ctx.clearRect(clearPosition[0], clearPosition[1], pixelSize, pixelSize);

    for (let tailPoint = 0; tailPoint < this.tail.length; tailPoint++) {
      /* Correct tailpoint x and y to actual size */
      const realPosition = this.tail[tailPoint].map(point => point * pixelSize);

      ctx.fillRect(realPosition[0], realPosition[1], pixelSize, pixelSize);
    }
  },

  /* Generate the next tail array */
  updateTail() {
    //Add new point to tail based on snake direction
    switch (this.direction) {
      case 'left':
        this.tail.unshift([this.tail[0][0] - 1, this.tail[0][1]]);
        break;
      case 'right':
        this.tail.unshift([this.tail[0][0] + 1, this.tail[0][1]]);
        break;
      case 'up':
        this.tail.unshift([this.tail[0][0], this.tail[0][1] - 1]);
        break;
      case 'down':
        this.tail.unshift([this.tail[0][0], this.tail[0][1] + 1]);
        break;
    }
  },

  tailCrossing() {
    return new Set(this.tail).size !== this.tail.length; //TODO: fix function
  },
};

/* Apple object */
const apple = {
  position: [Math.floor(pixelAmount / 2), Math.floor(pixelAmount / 2)],
  color: 'red',

  /* Generate new coordinates */
  generatePosition() {
    this.position = this.position.map(
      () => Math.floor(Math.random() * pixelAmount) //TODO: Don't put the apple on top of the snake
    );
    console.debug(`%cApple position: ${this.position}`, 'color: red');
  },

  /* Draw the apple */
  draw() {
    const realPosition = this.position.map(point => point * pixelSize);

    ctx.fillStyle = this.color;
    ctx.fillRect(realPosition[0], realPosition[1], pixelSize, pixelSize);
  },
};

/* Handles everything that happens on the canvas */
const game = {
  fps: 5,
  over: false,

  /* Game init function */
  init() {
    apple.draw();
  },

  /* Game loop function */
  loop() {
    /* Draw snake */
    snake.updateTail();
    snake.draw();

    if (JSON.stringify(snake.tail[0]) === JSON.stringify(apple.position)) {
      console.debug('Snake ate apple');
      score += 1;
      snake.updateTail();
      apple.generatePosition();
      apple.draw();
    }
    if (
      snake.tail[0][0] > pixelAmount ||
      snake.tail[0][1] > pixelAmount ||
      snake.tail[0][0] < 0 ||
      snake.tail[0][1] < 0 ||
      snake.tailCrossing()
    ) {
      this.over = true;
    }
  },
};

/* Wrapper function requesting a gameloop */
function getLoop() {
  /* Slow down loop by game fps */
  setTimeout(() => {
    window.requestAnimationFrame(getLoop);
    game.loop();

    if (game.over) {
      console.debug('Game over'); //TODO: Exit game loop properly

      if (score > highscore) {
        console.debug('New highcore');
        highscore = score;
        window.localStorage.setItem('highscore', highscore);
      }
    }
  }, 1000 / game.fps);
}

/* Add event listeners */
document.addEventListener('keydown', updateDirection, false);
startButton.addEventListener(
  'click',
  () => {
    game.init();
    getLoop();
  },
  false
);
pixelAmountForm.addEventListener('submit', updatePixelAmount, false);

/* Updates size of canvas */
function updatePixelAmount(evt) {
  evt.preventDefault();
  pixelAmount = parseInt(pixelAmountInput.value);
  console.debug('Updated canvas size');
  ctx.canvas.width = ctx.canvas.height = (pixelAmount + 1) * pixelSize;
}

/* Clear higscore from localStorage */
const clearHighscore = () => (localStorage.highscore = 0);

/* Update direction for snake */
function updateDirection(evt) {
  const key = evt.code;

  console.debug(`Pressed %c${key}`, 'color: red');

  switch (key) {
    case 'ArrowLeft':
      evt.preventDefault();
      if (snake.direction !== 'right') {
        snake.direction = 'left';
      }
      break;
    case 'ArrowRight':
      evt.preventDefault();
      if (snake.direction !== 'left') {
        snake.direction = 'right';
      }
      break;
    case 'ArrowUp':
      evt.preventDefault();
      if (snake.direction !== 'down') {
        snake.direction = 'up';
      }
      break;
    case 'ArrowDown':
      evt.preventDefault();
      if (snake.direction !== 'up') {
        snake.direction = 'down';
      }
      break;

    //TODO: Add pause function
  }
}
