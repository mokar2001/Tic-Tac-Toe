// HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.cell');
const xPointDiv = document.querySelector('.x-point');
const oPointDiv = document.querySelector('.o-point');

// game constants
const xSymbol = '×';
const oSymbol = '○';


// Game Variable
let gameIsLive = true;
let xTurn = true;
let filledCellsCount = 0;
let xPoint = 0;
let oPoint = 0;


// Event Handlers
const handleReset = (e, initialPoints) => {
  for (let cell of cellDivs) {
    cell.classList.remove('selected');
    cell.classList.remove('win');
    cell.textContent = '';
  }
  if (initialPoints) {
    xPoint = 0;
    oPoint = 0;
    xTurn = true;
    statusDiv.textContent = 'X Turn';
    updatePoints();
  }
  filledCellsCount = 0;
  gameIsLive = true;
}

const updatePoints = () => {
  xPointDiv.textContent = xPoint.toString();
  oPointDiv.textContent = oPoint.toString();
}

const handleCell = (e) => {
  if (gameIsLive === true) {
    let cell = e.target;
    let cellValue = cell.textContent;
  
    if (cellValue === '') {
      cell.textContent = xTurn === true ? 'X' : 'O';
      cell.classList.add('selected');
      xTurn = !xTurn;
      statusDiv.textContent = xTurn === true ? 'X Turn' : 'O Turn';
      filledCellsCount += 1;
      checkGameStatus();
      updatePoints();
    }
  }
}


// Event Listener
resetDiv.addEventListener('click', handleReset.bind(this, true));

for (let cell of cellDivs) {
  cell.addEventListener('click', handleCell);
}


// Game Handler Functions
const areEqualCell = (cell1, cell2, cell3) => {
  if (cell1.textContent !== '' && cell1.textContent === cell2.textContent && cell2.textContent === cell3.textContent) {
    const won = cell1.textContent;
    statusDiv.textContent = `${won} Won`;
    if (won === 'X') {
      xPoint += 1;
    } else {
      oPoint += 1;
    }
    return true;
  } else {
    return false;
  }
}

const changeCellToWinStatus = (cell1, cell2, cell3) => {
  cell1.classList.add('win');
  cell2.classList.add('win');
  cell3.classList.add('win');
}

const checkGameStatus = () => {
  let cell1 = cellDivs[0];
  let cell2 = cellDivs[1];
  let cell3 = cellDivs[2];
  let cell4 = cellDivs[3];
  let cell5 = cellDivs[4];
  let cell6 = cellDivs[5];
  let cell7 = cellDivs[6];
  let cell8 = cellDivs[7];
  let cell9 = cellDivs[8];
  let winOrDraw = false;
  // Check First Row
  if (areEqualCell(cell1, cell2, cell3)) {
    changeCellToWinStatus(cell1, cell2, cell3);
    winOrDraw = true;
  }

  // Check Second Row
  else if (areEqualCell(cell4, cell5, cell6)) {
    changeCellToWinStatus(cell4, cell5, cell6);
    winOrDraw = true;
  }

  // Check Third Row
  else if (areEqualCell(cell7, cell8, cell9)) {
    changeCellToWinStatus(cell7, cell8, cell9);
    winOrDraw = true;
  }

  // Check First Column
  else if (areEqualCell(cell1, cell4, cell7)) {
    changeCellToWinStatus(cell1, cell4, cell7);
    winOrDraw = true;
  }

  // Check Second Column
  else if (areEqualCell(cell2, cell5, cell8)) {
    changeCellToWinStatus(cell2, cell5, cell8);
    winOrDraw = true;
  }

  // Check Third Column
  else if (areEqualCell(cell3, cell6, cell9)) {
    changeCellToWinStatus(cell3, cell6, cell9);
    winOrDraw = true;
  }

  // Check Left-to-Right Diagonal
  else if (areEqualCell(cell1, cell5, cell9)) {
    changeCellToWinStatus(cell1, cell5, cell9);
    winOrDraw = true;
  }

  // Check Right-to-Left Diagonal
  else if (areEqualCell(cell3, cell5, cell7)) {
    changeCellToWinStatus(cell3, cell5, cell7);
    winOrDraw = true;
  }

  // Check Draw 
  if (filledCellsCount === 9) {
    statusDiv.textContent = 'Draw :)';
    winOrDraw = true;
  }

  // End of Game
  if (xPoint === 5 || oPoint === 5) {
    gameIsLive = false;
    statusDiv.textContent = 'Finished';
  }
  else if (winOrDraw) {
    gameIsLive = false;
    setTimeout(handleReset, 1000);
  }
}