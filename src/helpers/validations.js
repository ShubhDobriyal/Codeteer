export const validateEmail = (email) => {
  const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  return regex.test(String(email).toLowerCase());
};

export const isEmpty = (input) => {
  return input === "" || input === null;
};

export const isTooShort = (input) => {
  return input.length < 20;
};
