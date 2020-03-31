// @ts-check

/* Initialize variables */
const pixelSize = 20; //Cannot be odd
const pixelAmount = 30;

/* Register HTML DOM elements by variables */
const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const startButton = document.getElementById('start');

/* Add event listeners */
document.addEventListener('keydown', updateDirection, false);
startButton.addEventListener('click', gameLoop, false);

/* Initialize HTML */
canvas.style.display = 'block';
game.canvas.width = game.canvas.height = pixelSize * pixelAmount;
canvas.style.backgroundColor = '#ffffff';

/* Snake object */
const snake = {
  speed: 5, //in FPS
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
    game.fillStyle = this.color;

    for (let tailPoint = 0; tailPoint < this.tail.length; tailPoint++) {
      /* Correct tailpoint x and y to actual size */
      const realPosition = this.tail[tailPoint].map(point => point * pixelSize);

      game.fillRect(realPosition[0], realPosition[1], pixelSize, pixelSize);
    }
  },

  /* Generate the next tail array */
  updateTail() {
    const realPosition = this.tail.pop().map(point => point * pixelSize);
    game.clearRect(realPosition[0], realPosition[1], pixelSize, pixelSize);

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
};

/* Apple object */
const apple = {
  position: [20, 20],
  color: 'red',

  /* Generate new coordinates */
  generate() {
    this.position.map(() => Math.floor(Math.random() * pixelAmount));
  },

  /* Draw the apple */
  draw() {
    const realPosition = this.position.map(point => point * pixelSize);

    game.fillStyle = this.color;
    game.fillRect(realPosition[0], realPosition[1], pixelSize, pixelSize);
  },
};

/* Wrapper function for gameloop */
function gameLoop() {
  /* Slow down loop by snake speed*/
  setTimeout(() => {
    window.requestAnimationFrame(gameLoop);
    gameUpdate();
  }, 1000 / snake.speed);
}

/* Function that is being run each tick */
function gameUpdate() {
  /* Draw snake */
  snake.draw();
  snake.updateTail();

  if (snake.tail[0] === apple.position) {
  }
}

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
}
