class Game {
  constructor() {
    this.currentFigure = [[0,0,0,0], [0,0,1,0], [1,1,1,0], [0,0,0,0,]];
  }

  createGame() {
    let canvasGame = document.createElement('canvas');
    canvasGame.id = 'canvasGame';
    canvasGame.width = 300;
    canvasGame.height = 500;
    document.body.appendChild(canvasGame);
    this.ctx = canvasGame.getContext('2d');
    document.addEventListener('keydown', game.onkeydown)
  }

  moveGame() {

  }

  drawGame() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillRect(0, 0, 50, 100);
  }

  rotateFigure() {
    let arr = [[1,2,3], [4,5,6], [7,8,9]];
    let newArr = JSON.parse(JSON.stringify(arr));

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        newArr[j][i] = arr[i][j];
      }
    }
  }

  shiftFigure() {

  }

  onkeydown(e) {
    switch (e.keyCode) {
      case 38:  // up
      rotateFigure();
        break;
      case 40:  // down

        break;
      case 39:  // right
      shiftFigure();
        break;
      case 37:  // left
      shiftFigure();
        break;
    }
  }

}


let game = new Game();
game.createGame();
game.drawGame();
console.log(game.currentFigure);
