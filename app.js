const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase ul');
const missed = 0;

const startButton = document.querySelector('.btn__reset');
const startOverlay = document.querySelector('.start');
const title = document.querySelector('.title');
const btn = document.querySelectorAll('.keyrow button');

const phrases = ['Frog is rapidly getting angry', 'Coding is fun', 'Playing games is not fun', 'Corgi is derping around', 'Snake eater'];

startButton.addEventListener('click', () => {
  startOverlay.style.display = 'none';
  startButton.style.display = 'none';
  title.style.display = 'none';
});

function getRandomPhraseAsArray (arr) {
  const string = arr[Math.floor(Math.random() * arr.length)].split('');
  console.log(string);
  return string;
}

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
}


function checkLetter (input) {
  const letters = document.querySelectorAll('.letter');
  console.log(letters);
  for (var i = 0; i < letters.length; i++) {
    if (letters[i].textContent == input) {
      letters[i].style.color = 'rgb(0, 0, 0)';
      const stored = letters[i];
      console.log('yo');
      return stored;
    } else {
      return null;
    }
  }
}

addPhraseToDisplay(getRandomPhraseAsArray(phrases));

qwerty.addEventListener('keydown', (e) => {
  for (var i = 0; i < btn.length; i++) {
    if (e.key == btn[i].textContent) {
      checkLetter(e.key);
    }
  }
});
