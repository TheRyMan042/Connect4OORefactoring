//Ryan Hutchings
//Unit 16.2 Exercise: Connect 4 OO

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
*/

class Game {
  //saved board dimisions as default parameters
  constructor(player1, player2, width = 7, height = 6) {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.currPlayer = player1; //active player using Player class: player 1 or player 2
    this.players = [player1, player2]; //stores the current players
    this.board = []; //array of rows, each row is array of cells  (board[y][x])
    this.gameOver = false;

    //Calling methods within the class instead of outside the class
    this.makeBoard();
    this.makeHtmlBoard();
  }

  /** makeBoard: create in-JS board structure:
  * board = array of rows, each row is array of cells  (board[y][x]) */
  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  //to get the handle event to respond to other functions, using bind on it
  handleEvent = this.handleClick.bind(this);

  /** makeHtmlBoard: make HTML table and row of column tops. */
  makeHtmlBoard() {
    const board = document.getElementById('board'); //used outside class also

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');

    top.addEventListener('click', this.handleEvent); //will run the handleclick function from handleEvent

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.colorName; //changes color based on player's turn
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end and stops the user from making more moves*/
  endGame(msg) {
    alert(msg);
    const columnTop = document.querySelector('#column-top');
    columnTop.removeEventListener('click', this.handleEvent);
    startBtn.value = 'Start New Game';
  }

  /** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      return this.endGame(`${this.currPlayer.colorName.toUpperCase()} player won!`);
    }

    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    // switch players
    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  checkForWin() {
    //made _win an arrow fuction so "this" can be used
    const _win = (cells) => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          this.gameOver = true;
          return this.gameOver;
        }
      }
    }
  }
}

//Makes a new player to play Connect Four
class Player {
  constructor(colorName) {
    this.colorName = colorName; //saves the player's color
  }
}

//using start button to start the game
const startBtn = document.querySelector('#startBtn');
const htmlBoard = document.getElementById('board');

//getting the colors from input
const colorPlay1 = document.querySelector('#player1');
const colorPlay2 = document.querySelector('#player2');

let beenClicked = false;
startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (beenClicked) {
    htmlBoard.innerHTML = ''; //clears the onscreen board
  }
  beenClicked = true;
  startBtn.value = 'Restart Game';

  //starts game with the colors the players pick and runs the game
  new Game(new Player(colorPlay1.value), new Player(colorPlay2.value));
});