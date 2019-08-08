const {checkInput} = require('../service/Check');

const checkId = id =>{
  let error = {
    isError: false,
    errorMessage: {}
  }

  const err = checkInput(id);

  if (err.isError) {
    error.isError = true;
    error.errorMessage.id = 'id' + err.message;

    return error;
  }

  return error;
}