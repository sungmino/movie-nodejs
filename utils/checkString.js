const checkString = str => {
  let error = {
    isError: false,
    errorMessage: ''
  }

  if (str === undefined || str === null) {
    error.isError = true;
    error.errorMessage = 'is required';

    return error;
  }

  if (typeof str !== 'string') {
    error.isError = true;
    error.errorMessage = 'must be a string';

    return error;
  }

  str = str.trim();

  if (str === '') {
    error.isError = true;
    error.erroMessage = 'must not be empty';

    return error;
  }

  return error;
}

module.exports = {
  checkString
}