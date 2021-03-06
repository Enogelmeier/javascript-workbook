'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let hint = '';
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
  return solution;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess){

    let solutionArray = solution.split('');
    let guessArray = guess.split('');
    let numberRight = 0;
    let numberClose = 0;


    for(let i = 0; i < 4; i++){

      if (guessArray[i]===solutionArray[i]){ /*identifies letter and index that are correct*/
       board.push(guessArray[i]);
         numberRight++;

      }
      else if (solutionArray.includes(guessArray[i]) && (board.push(guessArray[i]) === false)){
        board.push(guessArray[i]);
          numberClose++;
      }
    }
    hint = `${numberRight}-${numberClose}`;

    return hint;
    }


function mastermind(guess) {
  generateHint(guess);

  if (guess === solution){
    return 'You guessed it!';
  }
  else {
    board.push(guess+ ': ' + hint);
    printBoard();
  }
  // solution = 'abcd'; // uncomment this when developing
}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    console.log( mastermind(guess) );
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 5);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      solution = 'abcd';
      assert.equal(generateHint('abdc'), '2-0');
    });
    it('should generate hints if solution has duplicates', () => {
      solution = 'abcd';
      assert.equal(generateHint('aabb'), '1-0');
    });

  });

} else {
  generateSolution();
  getPrompt();
}
