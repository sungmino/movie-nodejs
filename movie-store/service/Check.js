const checkInput = st => {
  let console = {
    isError = false,
    errorMessage = ''    
  }
  if (st === undefined || st === null || st === ''){
    error.isError = true;
    error.errorMessage = 'error';
    return error;
  }

  if (typeof st !== 'String'){
    error.isError = true;
    error.errorMessage = 'error';
    return error;
  }
  return error;

}

module.exports = {
  checkInput
}