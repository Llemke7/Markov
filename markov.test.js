const MarkovMachine = require('./markov'); // Import your MarkovMachine class

describe('MarkovMachine', () => {
  describe('makeText', () => {
    it('should generate text with the expected number of words', () => {
      const text = "the cat in the hat";
      const mm = new MarkovMachine(text);
      const generatedText = mm.makeText(5); // Generate text with 5 words
      const words = generatedText.split(' ');
      expect(words.length).toBe(5);
    });

    it('should generate text ending with a sentence-ending word', () => {
      const text = "the cat in the hat";
      const mm = new MarkovMachine(text);
      const generatedText = mm.makeText();
      const lastWord = generatedText.split(' ').pop();
      const sentenceEndingWords = ['.', '!', '?']; // Add more if needed
      expect(sentenceEndingWords.includes(lastWord.slice(-1))).toBeTruthy();
    });

    it('should return an empty string if the Markov machine is not initialized', () => {
      const mm = new MarkovMachine('');
      expect(mm.makeText()).toBe('');
    });

  });
});
