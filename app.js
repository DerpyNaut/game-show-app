const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase ul');
let missed = 0;
let letterFound = false;

const startButton = document.querySelector('.btn__reset');
const startOverlay = document.querySelector('.start');
const title = document.querySelector('.title');
const btn = document.querySelectorAll('.keyrow button');
const tries = document.querySelectorAll('.tries').parentElement;


const phrases = ['Frog is rapidly getting angry', 'Coding is fun', 'Playing games is not fun', 'Corgi is derping around', 'Snake eater'];

startButton.addEventListener('click', () => {
  startOverlay.style.display = 'none';
  startButton.style.display = 'none';
  title.style.display = 'none';
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));
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
    tries.removeChild(tries.lastChild);
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
      startOverlay.textContent = 'You won!';
  } else if (missed >= 5) {
      startOverlay.style.display = '';
      startOverlay.className += ' lose';
      startOverlay.textContent = 'You lost!';
  }
};

document.addEventListener('keydown', (e) => {
  for (var i = 0; i < btn.length; i++) {
    if (e.key == btn[i].textContent) {
      btn[i].className = ' chosen';
      btn[i].setAttribute('disabled', '');
      checkLetter(e.key);
    }
  }
  checkWin();
});
