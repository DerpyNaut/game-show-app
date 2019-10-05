const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase ul');
let missed = 0;
let letterFound = false;

const startButton = document.querySelector('.btn__reset');
const startOverlay = document.querySelector('.start');
const title = document.querySelector('.title');
const btn = document.querySelectorAll('.keyrow button');
let gameOn = false;

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
    } else {
      li.className = 'space';
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
    const triesField = document.querySelector('#scoreboard ol');
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
      startOverlay.className = 'win';
      title.style.display = '';
      title.textContent = 'You won!';
      startButton.style.display = '';
      gameOn = false;
      clearGame();
  } else if (missed >= 5) {
      startOverlay.style.display = '';
      startOverlay.className = 'lose';
      title.style.display = '';
      title.textContent = 'You lose!';
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

  const triesField = document.querySelector('div#scoreboard ol');
  triesField.innerHTML = '';

  for (var i = 0; i < 5; i++) {
    const li = document.createElement('li');
    li.className = 'tries';

    const img = document.createElement('img');
    img.src = 'images/liveHeart.png';
    img.height = '35';
    img.width = '30';

    li.appendChild(img);
    triesField.appendChild(li);
  }
};

document.addEventListener('keydown', (e) => gameCheck(e));
document.addEventListener('click', (e) => gameCheck(e));

function gameCheck(e) {
  if (gameOn) {
    for (var i = 0; i < btn.length; i++) {
      if (e.target.innerHTML == btn[i].textContent || e.key == btn[i].textContent && btn[i].hasAttribute('disabled') === false) {
        btn[i].className = ' chosen';
        btn[i].setAttribute('disabled', '');
        if (e.key) {
        checkLetter(e.key);
      } else {
        checkLetter(e.target.innerHTML);
      }
      }
    }
  checkWin();
  }
};
