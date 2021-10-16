export default function Question(question, choices, ansKey) {
  this.question = question;
  this.choices = choices;
  this.ansKey = ansKey;
}

Question.prototype.isCorrect = function (guessKey) {
    return guessKey == this.ansKey;
}


