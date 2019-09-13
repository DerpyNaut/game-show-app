const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase ul');
let missed = 0;
let letterFound = false;

const startButton = document.querySelector('.btn__reset');
const startOverlay = document.querySelector('.start');
const title = document.querySelector('.title');
const btn = document.querySelectorAll('.keyrow button');
var gameOn = false;

const phrases = ['Frog is rapidly getting angry', 'Coding is fun', 'Playing games is not fun', 'Corgi is derping around', 'Snake eater'];

startButton.addEventListener('click', () => {
  startOverlay.style.display = 'none';
  startButton.style.display = 'none';
  title.style.display = 'none';
  missed = 0;
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));
  gameOn = true;
});

function getRandomPhraseAsArray (arr) {
  const string = arr[Math.floor(Math.random() * arr.length)].split('');
  console.log(string);
  return string;
};

function addPhraseToDisplay(arr) {
  for (var i = 0; i<arr.length; i++) {
    const element = arr[i];
    const li = document.createElement('li');
    li.innerHTML = element;
    phrase.appendChild(li);
    if (li.innerHTML !== " ") {
      li.className = 'letter';
    }
  }
};

function checkLetter (input) {
  const letters = document.querySelectorAll('.letter');
  const stored = [];
  for (var i = 0; i < letters.length; i++) {
    if (letters[i].textContent.toLowerCase() === input.toLowerCase()) {
      letters[i].className += ' show';
      stored.push(letters[i]);
    }
  }
  if (stored.length !== 0) {
    letterFound = true;
  } else {
    letterFound = false;
    missed += 1;
    const triesField = document.querySelector('.tries').parentNode;
    const tries = document.querySelectorAll('.tries');
    triesField.removeChild(tries[0]);
  }
  console.log(stored);
  return stored;
};

function checkWin() {
  const letters = document.querySelectorAll('.letter');
  const shown = document.querySelectorAll('.show');
  if (letters.length === shown.length) {
      startOverlay.style.display = '';
      startOverlay.className += ' win';
      const endText = document.createElement('p');
      endText.textContent = 'You won!';
      startOverlay.prepend(endText);
      startButton.style.display = '';
      gameOn = false;
      clearGame();
  } else if (missed >= 5) {
      startOverlay.style.display = '';
      startOverlay.className += ' lose';
      const endText = document.createElement('p');
      endText.textContent = 'You lose!';
      startOverlay.prepend(endText);
      startButton.style.display = '';
      gameOn = false;
      clearGame();
  }
};

function clearGame() {
  phrase.textContent = '';
  for (var i = 0; i < btn.length; i++) {
      btn[i].className = '';
      btn[i].removeAttribute('disabled');
  }
};

document.addEventListener('keydown', (e) => {
  if (gameOn) {
    for (var i = 0; i < btn.length; i++) {
      if (e.key == btn[i].textContent && btn[i].hasAttribute('disabled') === false) {
        btn[i].className = ' chosen';
        btn[i].setAttribute('disabled', '');
        checkLetter(e.key);
      }
    }
  checkWin();
  }
});
