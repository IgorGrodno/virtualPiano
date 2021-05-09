const COLECTION = document.querySelectorAll(".piano-key");
const PIANO = document.getElementById("piano");
const FSButton = document.getElementById("button");
const LettersButton = document.getElementById("lettersButton");
const NotesButton = document.getElementById("notesButton");

const Play = (event) => {
  const note = event.target.dataset.note;
  const src = `assets/audio/${note}.mp3`;
  playAudio(src);
};

const StartCorespondOver = (event) => {
  COLECTION.forEach((elem) => {
    elem.addEventListener("mouseover", Play);
    elem.addEventListener("mouseover", Active);
  });
};

const StopCorespondOver = () => {
  COLECTION.forEach((elem) => {
    elem.removeEventListener("mouseover", Play);
    elem.removeEventListener("mouseover", Active);
  });
};

const Active = (event) => {
  if (
    event.target.classList.contains("piano-key") ||
    event.target.classList.contains("piano-key sharp")
  ) {
    let ell = document.getElementById(event.target.id);
    ell.classList.add("piano-key-active");
    setTimeout(notActive, 100, ell);
  }
};

const ActiveKey = (ell) => {
  ell.classList.add("piano-key-active");
  setTimeout(notActive, 100, ell);
};

const notActive = (ell) => {
  ell.classList.remove("piano-key-active");
};

const FullScreenMode = () => {
  if (document.fullscreen) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
};

const SwichLetters = (event) => {
  if (event.target == LettersButton) {
    LettersButton.classList.add("btn-active");
    NotesButton.classList.remove("btn-active");
    COLECTION.forEach((item) => {
      item.classList.add("letter");
    });
  }
  if (event.target == NotesButton) {
    LettersButton.classList.remove("btn-active");
    NotesButton.classList.add("btn-active");
    COLECTION.forEach((item) => {
      item.classList.remove("letter");
    });
  }
};

document.addEventListener("mousedown", StartCorespondOver, false);
document.addEventListener("mouseup", StopCorespondOver);
PIANO.addEventListener("click", Play);
document.addEventListener("click", Active);
FSButton.addEventListener("click", FullScreenMode);

window.addEventListener("keydown", (event) => {
  const key = String.fromCharCode(event.keyCode).toUpperCase();
  let note = "";
  let ell = "";
  COLECTION.forEach((element) => {
    if (element.dataset.letter == key) {
      ell = element;
      note = element.dataset.note;
    }
  });
  const src = `assets/audio/${note}.mp3`;
  ActiveKey(ell);
  playAudio(src);
});
LettersButton.addEventListener("click", SwichLetters);
NotesButton.addEventListener("click", SwichLetters);

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}
