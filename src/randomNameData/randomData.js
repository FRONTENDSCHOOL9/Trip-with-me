export function getRandomPhrase() {
  const randomPhrases = [
    '빠니보틀',
    '곽튜브',
    '원지의 하루',
    '체코제',
    '캡틴따거',
    '쏘이',
  ];

  let lastSelectedPhrase = '';

  let availablePhrases = randomPhrases.filter(
    phrase => phrase !== lastSelectedPhrase,
  );
  const randomIndex = Math.floor(Math.random() * availablePhrases.length);
  const selectedPhrase = availablePhrases[randomIndex];

  lastSelectedPhrase = selectedPhrase;

  return selectedPhrase;
}
