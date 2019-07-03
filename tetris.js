class Game {
  constructor() {
    this.currentFigure = [
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0]
    ];
    this.x = 120;
    this.y = 0;
    this.width = 20;
    this.acceleration = 0;
    this.updateGame = 500;
    this.listFigure = [
      [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [1, 1, 1, 0],
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
        [0, 0, 1, 0],
        [1, 1, 1, 0],
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
        [0, 0, 1, 0],
        [1, 1, 1, 0],
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
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ]
    ];
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
    setInterval(this.moveGame.bind(this), 500);
  }
  moveGame() {
    this.renderGame();
    if (this.acceleration) this.y += this.width * 2;
    this.y += this.width;
    console.log(this.y);
  }
  renderGame() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
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
    if (e.keyCode === 40) {
      game.cancelAccelerationFigure();
    }
  }
}

let game = new Game();
game.createGame();
game.startGame();
