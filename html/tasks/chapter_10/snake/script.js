/* Initialize variables */
const pixelSize = 20; //Cannot be odd
const pixelAmount = 30;

/* Register HTML DOM elements by variables */
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const scoreSpan = document.getElementById('score');
const highscoreSpan = document.getElementById('highscore');
const pixelAmountInput = document.getElementById('pixelAmount');
const pixelAmountForm = document.getElementById('pixelAmountForm');

scoreSpan.innerHTML = score;
highscoreSpan.innerHTML = highscore;

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
  deadTail: [0, 0],

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

    this.deadTail = this.tail.pop();
  },

  /* Draw the snake by the tail array */
  draw() {
    ctx.fillStyle = this.color;

    const clearPosition = this.deadTail.map(point => point * pixelSize);
    ctx.clearRect(clearPosition[0], clearPosition[1], pixelSize, pixelSize);

    for (let tailPoint = 0; tailPoint < this.tail.length; tailPoint++) {
      /* Correct tailpoint x and y to actual size */
      const realPosition = this.tail[tailPoint].map(point => point * pixelSize);

      ctx.fillRect(realPosition[0], realPosition[1], pixelSize, pixelSize);
    }
  },

  addTail() {
    this.tail.push[this.deadTail];
  },

  tailCrossing() {
    return new Set(this.tail).size !== this.tail.length; //TODO: fix function
  },
};

/* Apple object */
const apple = {
  position: [Math.floor(pixelAmount / 2), Math.floor(pixelAmount / 2)],
  color: 'red',

  /* Sets position to the middle based on pixelAmount */
  setStartPosition() {
    this.position = [Math.floor(pixelAmount / 2), Math.floor(pixelAmount / 2)];
  },

  /* Generate new coordinates */
  generatePosition() {
    this.position = game.getClearSpotRandom(); //TODO: Switch between the functions based on how much the snake has eaten
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
  hasEnded: false,
  isPaused: false,

  /* Game init function */
  init() {
    apple.draw();
  },

  /* Game loop function */
  loop() {
    /* Draw snake */
    snake.updateTail();
    snake.draw();

    if (snake.tail[0].toString() === apple.position.toString()) {
      console.debug('Snake ate apple');
      score += 1;
      scoreSpan.innerHTML = score;
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
      this.hasEnded = true;
    }
  },

  reset() {
    /*TODO: get board size from localstorage */
    snake.tail = [
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 0],
    ];
    snake.direction = 'right';
    apple.setStartPosition();
    game.hasEnded = false;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  },

  /* Function to determine whether a coordinate hits the snake
   *  Retuns a bool
   */
  hitsSnake(coordinate) {
    return snake.tail
      .map(snakeCoordinate => snakeCoordinate.toString()) //TODO: Rewrite
      .toString()
      .includes(coordinate.toString());
  },

  /* Function to be used if the snake is covering a small part of the map
   *  Returns a coordinate array
   */
  getClearSpotRandom() {
    while (true) {
      const coordinate = Array.from({length: 2}, () =>
        Math.floor(Math.random() * pixelAmount)
      );

      if (!this.hitsSnake(coordinate)) {
        return coordinate;
      }
    }
  },

  /* Function to be used if the snake is covering a big part of the map
   *  Returns a coordinate array
   */
  getClearSpotForce() {
    clearSpots = [];

    for (let x = 0; x < pixelAmount; x++) {
      for (let y = 0; y < pixelAmount; y++) {
        if (!this.hitsSnake([x, y])) {
          clearSpots.push([x, y]);
        }
      }
    }
    return clearSpots[Math.floor(Math.random() * clearSpots.length)];
  },
};

/* Wrapper function requesting a gameloop */
function getLoop() {
  /* Slow down loop by game fps */
  if (!game.hasEnded) {
    setTimeout(() => {
      window.requestAnimationFrame(getLoop);
      game.loop();
    }, 1000 / game.fps);
  } else {
    console.debug('Game over');

    if (score > highscore) {
      console.debug('New highcore');
      highscore = score;
      window.localStorage.setItem('highscore', highscore);
    }
  }
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
resetButton.addEventListener('click', game.reset, false);
pixelAmountForm.addEventListener('submit', updatePixelAmount, false);

/* Updates size of canvas */
function updatePixelAmount(evt) {
  evt.preventDefault();
  pixelAmount = parseInt(pixelAmountInput.value);
  console.debug('Updated canvas size');
  ctx.canvas.width = ctx.canvas.height = (pixelAmount + 1) * pixelSize;
  apple.setStartPosition();
}

/* Clear higscore from localStorage */
const clearHighscore = () => (window.localStorage.highscore = 0);

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
  }

  //TODO: Add pause function
}
