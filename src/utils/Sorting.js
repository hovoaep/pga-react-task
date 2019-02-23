export const sortScoreData = data => {
  return data.sort((score1, score2) => {
    if (score1.score > score2.score) {
      return -1;
    } else if (score1.score < score2.score) {
      return 1;
    }
    if (score1.surname.toLowerCase() < score2.surname.toLowerCase()) {
      return -1;
    } else if (score1.surname.toLowerCase() > score2.surname.toLowerCase()) {
      return 1;
    }
    return 0;
  });
};
