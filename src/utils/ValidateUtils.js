const messages = {
  filedRequired: "Filed required",
  onlyNumber: "Please enter only numbers",
  onlyZeroToHandredRange: "Plesase enter numbers from 0 to 100",
};
const isEmpty = field => !field || field.trim().length === 0;
const isCorrectRange = (start, end) => field => field >= start && field <= end;

const zeroToHandredRange = isCorrectRange(0, 100);

export const scoreFormValidation = ({ name, surname, score, touched }) => {
  const errors = {};
  if (isEmpty(name) && touched.name) {
    errors.name = messages.filedRequired;
  }
  if (isEmpty(surname) && touched.surname) {
    errors.surname = messages.filedRequired;
  }
  if (touched.score) {
    if (isEmpty(score)) {
      errors.score = messages.filedRequired;
    } else if (isNaN(Number(score))) {
      errors.score = messages.onlyNumber;
    } else if (!zeroToHandredRange(Number(score))) {
      errors.score = messages.onlyZeroToHandredRange;
    }
  }

  return errors;
};
