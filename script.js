document.addEventListener("DOMContentLoaded", function () {
  let secretWord = "";
  const history = [];

  function loadWords() {
    secretWord = dictionaryWords[Math.floor(Math.random() * dictionaryWords.length)];
    console.log("Secret Word (dictionary):", secretWord);
  }

  function startGame() {
    loadWords();
  }

  function isValidDictionaryWord(word) {
    return dictionaryWords.includes(word);
  }

  window.makeGuess = function () {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toUpperCase();
    guessInput.value = "";

    if (guess.length !== 4) {
      alert("Please enter a 4-letter word.");
      return;
    }

    if (!isValidDictionaryWord(guess)) {
      alert(`"${guess}" is not a valid word in the dictionary.`);
      return;
    }

    let bulls = 0;
    let cows = 0;

    const secretArray = secretWord.split("");
    const guessArray = guess.split("");
    const secretCopy = [...secretArray];

    for (let i = 0; i < 4; i++) {
      if (guessArray[i] === secretArray[i]) {
        bulls++;
        secretCopy[i] = null;
        guessArray[i] = null;
      }
    }

    for (let i = 0; i < 4; i++) {
      if (guessArray[i] !== null) {
        const index = secretCopy.indexOf(guessArray[i]);
        if (index !== -1) {
          cows++;
          secretCopy[index] = null;
        }
      }
    }

    history.push(`${guess} - 🐂 Bulls: ${bulls}, 🐮 Cows: ${cows}`);
    updateHistory();

    if (bulls === 4) {
      const winMsg = document.createElement("p");
      winMsg.className = "win";
      winMsg.textContent = `🎉 You guessed it right: ${secretWord}!`;
      document.getElementById("result").appendChild(winMsg);

      document.getElementById("revealBtn").disabled = true;
      document.getElementById("revealBtn").style.opacity = "0.5";
    }
  };

  function updateHistory() {
    const historyList = document.getElementById("history");
    historyList.innerHTML = "";
    for (let item of history) {
      const li = document.createElement("li");
      li.textContent = item;
      historyList.appendChild(li);
    }
  }

  window.revealAnswer = function () {
    document.getElementById("answer").textContent = `The secret word is: ${secretWord}`;
    document.getElementById("revealBtn").disabled = true;
    document.getElementById("revealBtn").style.opacity = "0.5";
  };

  window.resetGame = function () {
    loadWords();
    history.length = 0;
    updateHistory();
    document.getElementById("result").innerHTML = `<ul id="history"></ul>`;
    document.getElementById("answer").textContent = "";
    document.getElementById("revealBtn").disabled = false;
    document.getElementById("revealBtn").style.opacity = "1";
  };

  window.showHelp = function () {
    const help = document.getElementById("helpText");
    if (help.style.display === "none" || help.style.display === "") {
      help.style.display = "block";
      help.style.opacity = 0;
      setTimeout(() => { help.style.opacity = 1; }, 50);
    } else {
      help.style.opacity = 0;
      setTimeout(() => { help.style.display = "none"; }, 300);
    }
  };

  document.getElementById("guessInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      makeGuess();
    }
  });

  startGame();
});
