/** Textual markov chain generator */
class MarkovMachine {
  /** build markov machine; read in text.*/
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  makeChains() {
    this.chains = {};
    for (let i = 0; i < this.words.length - 1; i++) {
      const currentWord = this.words[i];
      const nextWord = this.words[i + 1];
      if (!this.chains[currentWord]) {
        this.chains[currentWord] = [];
      }
      this.chains[currentWord].push(nextWord);
    }
    const lastWord = this.words[this.words.length - 1];
    if (!this.chains[lastWord]) {
      this.chains[lastWord] = [null];
    }
  }

  /** return random text from chains */
  makeText(numWords = 100) {
    let output = [];
    let currentWord = this.getRandomWord();
    while (output.length < numWords && currentWord !== null) {
      output.push(currentWord);
      currentWord = this.getNextWord(currentWord); // Passing currentWord as parameter
    }
    return output.join(" ");
  }

  getRandomWord() {
    const words = Object.keys(this.chains);
    return words[Math.floor(Math.random() * words.length)];
  }

  getNextWord(currentWord) { // Accept currentWord as parameter
    const possibleNextWords = this.chains[currentWord];
    return possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
  }
}

module.exports = MarkovMachine;
