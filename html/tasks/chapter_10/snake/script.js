// @ts-check

/* Initialize variables */
const pixelSize = 20;
const pixelAmount = 40;

/* Register HTML DOM elements by variables */
const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const startButton = document.getElementById('start');

/* Add event listeners */
document.addEventListener('keydown', updateDirection, false);
startButton.addEventListener('click', gameLoop, false);

/* Initialize HTML with functions */
canvas.style.display = 'block';
canvas.style.width = canvas.style.height = `${pixelSize * pixelAmount}px`;
canvas.style.backgroundColor = '#ffffff';

/* Snake class */
class snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.speed = 5;
    this.direction = 'left';
    this.tail = [
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 0],
    ];
    this.color = '#00ff00';
  }

  draw() {
    game.fillStyle = this.color;
    for (let tailPoint = 0; tailPoint < this.tail.length; tailPoint++) {
      /* Correct tailpoint x and y to actual size */
      const pixelPosition = this.tail[tailPoint].map(
        point => point * pixelSize
      );
      game.fillRect(
        pixelPosition[0],
        pixelPosition[1],
        pixelPosition[0] + pixelSize,
        pixelPosition[1] + pixelSize
      );
    }
  }

  updateTail() {
    this.tail.pop();

    switch (this.direction) {
      case 'left':
        this.tail.unshift([this.tail[0][0] + 1, this.tail[0][1]]);
        break;
      case 'right':
        this.tail.unshift([this.tail[0][0] - 1, this.tail[0][1]]);
        break;
      case 'up':
        this.tail.unshift([this.tail[0][0], this.tail[0][1] - 1]);
        break;
      case 'down':
        this.tail.unshift([this.tail[0][0], this.tail[0][1] + 1]);
        break;
    }
  }
}

/* Apple class */
class apple {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

const Snake = new snake();

/* Wrapper function for gameloop */
function gameLoop() {
  /* Slow down loop */
  setTimeout(() => {
    window.requestAnimationFrame(gameLoop);
    gameUpdate();
  }, 1000 / Snake.speed);
}

/* Function that is being run each tick */
function gameUpdate() {
  /* Draw snake */
  Snake.draw();
  Snake.updateTail();
}

/* Update direction for snake */
function updateDirection(evt) {
  const key = evt.code;

  console.log(key);

  switch (key) {
    case 'ArrowLeft':
      evt.preventDefault();
      Snake.direction = 'left';
      break;
    case 'ArrowRight':
      evt.preventDefault();
      Snake.direction = 'right';
      break;
    case 'ArrowUp':
      evt.preventDefault();
      Snake.direction = 'up';
      break;
    case 'ArrowDown':
      evt.preventDefault();
      Snake.direction = 'down';
      break;
  }
}
