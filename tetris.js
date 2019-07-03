class Game {
  constructor() {
    this.currentFigure = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.listFigure = [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 1],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 1],
        [0, 0, 0, 0]
      ]
    ];
    this.listFixedFigure = [];
    this.x = 120;
    this.y = 0;
    this.width = 20;
    this.acceleration = 0;
    this.updateGame = 500;
  }
  createGame() {
    let canvasGame = document.createElement('canvas');
    canvasGame.id = 'canvasGame';
    canvasGame.width = 300;
    canvasGame.height = 500;
    document.body.appendChild(canvasGame);
    this.ctx = canvasGame.getContext('2d');
    document.addEventListener('keydown', game.onkeydown);
    document.addEventListener('keyup', game.onkeyup);
  }
  startGame() {
    this.currentFigure = this.listFigure[getRandomInt(0, 7)];
    setInterval(this.moveGame.bind(this), 500);
  }
  moveGame() {
    this.renderGame();
    if (this.acceleration) this.y += this.width * 2;
    this.y += this.width;
    if (this.y === 400) {
      let x = this.x;
      let y = this.y;
      this.currentFigure.forEach((arrOut) => {
        x = this.x;
        arrOut.forEach((elm) => {
          if (elm) this.listFixedFigure.push({
            x,
            y
          });
          x += this.width;
        })
        y += this.width;
      })
      this.currentFigure = this.listFigure[getRandomInt(0, 7)];
      this.x = 120;
      this.y = 0;
    }
  }
  renderGame() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // render current figure
    let x = this.x;
    let y = this.y;
    this.currentFigure.forEach((arrOut) => {
      x = this.x;
      arrOut.forEach((elm) => {
        if (elm) this.ctx.fillRect(x, y, this.width, this.width)
        x += this.width;
      })
      y += this.width;
    })
    // render all fixed figures
    this.listFixedFigure.forEach((elm) => {
      this.ctx.fillRect(elm.x, elm.y, this.width, this.width);
    })
  }
  rotateFigure() {
    let newCurrentFigure = JSON.parse(JSON.stringify(game.currentFigure));
    game.currentFigure.forEach((arrOut, i) => {
      arrOut.forEach((elm, j) => {
        newCurrentFigure[j][i] = game.currentFigure[i][j];
      })
    })
    game.currentFigure = newCurrentFigure.reverse();
  }
  shiftFigure(shift) {
    if (shift === 'right') {
      game.x += game.width;
    } else {
      game.x -= game.width;
    }
  }
  accelerationFigure() {
    game.acceleration = 1;
  }
  cancelAccelerationFigure() {
    game.acceleration = 0;
  }
  onkeydown(e) {
    switch (e.keyCode) {
      case 38: // up
        game.rotateFigure();
        break;
      case 40: // down
        game.accelerationFigure();
        break;
      case 39: // right
        game.shiftFigure('right');
        break;
      case 37: // left
        game.shiftFigure('left');
        break;
    }
  }
  onkeyup(e) {
    if (e.keyCode === 40) { // down
      game.cancelAccelerationFigure();
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let game = new Game();
game.createGame();
game.startGame();
