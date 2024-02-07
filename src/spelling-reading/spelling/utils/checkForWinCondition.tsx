export function checkForWinCondition(currentWord: string, inputValue: string) {
  let isWin = false;
  if (inputValue === currentWord) isWin = true;
  return isWin;
}
