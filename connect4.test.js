//Ryan Hutchings
//Unit 16.2 Exercise: Connect 4 OO Unit Testing

describe("Check Player Class", () => {
  it("save separate colors for separate players", () => {
    let player1 = new Player('orange');
    let player2 = new Player('green');
    let player3 = new Player('#00FFFF');

    expect(player1.colorName).toBe('orange');
    expect(player2.colorName).toBe('green');
    expect(player3.colorName).toBe('#00FFFF');
  });
});



//run all tests on this Game class; the set up
const colorPlayer1 = document.querySelector('#player1');
const colorPlayer2 = document.querySelector('#player2');
colorPlayer1.value = 'orange';
colorPlayer2.value = 'green';
let myGuy1 = new Player(colorPlayer1.value);
let otherGuy2 = new Player(colorPlayer2.value);
const testConnectFour = new Game(myGuy1, otherGuy2);
testConnectFour.HEIGHT = 6;
testConnectFour.WIDTH = 7;

describe("Check Game Class", () => {
  //makeHTMLBoard is similar, but uses DOM to put it onscreen
  it("makeBoard(): make an empty game board using an array", () => {
    testConnectFour.board = [];
    testConnectFour.makeBoard();
    expect(testConnectFour.board).toEqual(
      [
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined]
      ]
    );
  });


  it("findSpotForCol(): searches for exact place to put the player's circle in", () => {
    //all 5 since it doesn't save to board yet
    console.log(testConnectFour); //empty board

    let x = 6; //numbers between 0 - 6
    expect(testConnectFour.findSpotForCol(x)).toEqual(5);
    testConnectFour.board[5][x] = testConnectFour.currPlayer; //adds player 1 to array board

    x = 5;
    expect(testConnectFour.findSpotForCol(x)).toEqual(5);
    testConnectFour.board[5][x] = testConnectFour.currPlayer;

    x = 2;
    expect(testConnectFour.findSpotForCol(x)).toEqual(5);
    testConnectFour.board[5][x] = testConnectFour.currPlayer;

    console.log(testConnectFour.board);
    x = 6;
    expect(testConnectFour.findSpotForCol(x)).toEqual(4);
    testConnectFour.board[4][x] = testConnectFour.currPlayer; //adds player 1 to array board

    console.log(testConnectFour.board); //some slots have been filled
  });

  it("checkForWin(): checks if someone won the game", () => {
    //winner
    testConnectFour.board = [
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [myGuy1, undefined, undefined, undefined, undefined, undefined, undefined],
      [myGuy1, otherGuy2, undefined, undefined, undefined, undefined, undefined],
      [myGuy1, otherGuy2, undefined, undefined, undefined, undefined, undefined],
      [myGuy1, otherGuy2, undefined, undefined, undefined, undefined, undefined]
    ]
    testConnectFour.checkForWin();
    expect(testConnectFour.gameOver).toBe(true);

    //tied
    testConnectFour.board = [
      [otherGuy2, myGuy1, otherGuy2, myGuy1, otherGuy2, myGuy1, otherGuy2],
      [otherGuy2, myGuy1, otherGuy2, myGuy1, otherGuy2, myGuy1, otherGuy2],
      [otherGuy2, myGuy1, otherGuy2, myGuy1, otherGuy2, myGuy1, otherGuy2],
      [myGuy1, otherGuy2, myGuy1, otherGuy2, myGuy1, otherGuy2, myGuy1],
      [myGuy1, otherGuy2, myGuy1, otherGuy2, myGuy1, otherGuy2, myGuy1],
      [myGuy1, otherGuy2, myGuy1, otherGuy2, myGuy1, otherGuy2, myGuy1]
    ]
    testConnectFour.checkForWin();
    expect(testConnectFour.gameOver).toBe(true);
  });
});

afterAll(() => {
  colorPlay1.value = '';
  colorPlay2.value = '';
  const htmlBoard = document.getElementById('board');
  htmlBoard.innerHTML = '';
  testConnectFour.board = []; //may not need since it makes a new board when starting a new game
});


//==================================================================
//endGame() and placeInTable() are done mainly in the DOM for onscreen appearance, so its not possible to test at the moment
//handleClick() is an event listener, so I can't test it either, but most of the functions in there have tests for them 
