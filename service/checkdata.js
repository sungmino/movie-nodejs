const { checkString } = require('../utils/checkString')
const { checkPageRecords } = require('../utils/ckeckPageRecords')
const Err = class {
  constructor (isError = false, errorMessage = {}) {
    this.isError = isError
    this.errorMessage = errorMessage
  }
}

// funston checkId
const checkId = id => {
  let error = new Err()
  error = checkString(id)

  if (error.isError) {
    // error.isError = true;
    error.errorMessage.id = 'id' + error.errorMessage

    return error
  }
  return error
}

// function checkPaging
const checkPaging = (page, records) => {
  const error = new Err()
  if (page === undefined && records === undefined) {
    return error
  }
  let check = checkPageRecords(page)
  if (check.isError) {
    error.isError = true
    error.errorMessage.page = 'page' + check.message
    return error
  }

  check = checkPageRecords(records)
  if (check.isError) {
    error.isError = true
    error.errorMessage.records = 'records' + check.message
    return error
  }

  return error
}

// check input get all films
const checkGetAllFilms = input => {
  const { page, records } = input
  return checkPaging(page, records)
}

// check input get all films by id
const checkGetFilmById = input => {
  const { id } = input
  return checkId(id)
}

// check input Filter films
const checkFilterFilms = input => {
  const { page, records } = input
  return checkPaging(page, records)
}

const checkSearchFilmByFieldInput = input => {
  const { page, records } = input
  let error = checkPaging(page, records)
  if (error.isError) {
    return error
  }

  error = checkSearchFilmByField(input)
  if (error.isError) {
    return error
  }
  return error
}
// check input search film by field
const checkSearchFilmByField = input => {
  const { page, records } = input
  const error = checkPaging(page, records)
  if (error.isError) {
    return error
  }

  // required field
  const fields = ['field', 'value']
  fields.forEach(field => {
    if (input[field] === '' || !input[field]) {
      error.isError = true
      error.errorMessage[field] = field + 'must not be empty'
      return error
    }
  })
  return error
}

// check input search film
const checkSearchFilm = input => {
  const { value, page, records } = input
  const error = checkPaging(page, records)
  if (error.isError) {
    return error
  }
  const err = checkString(value)
  if (err.isError) {
    error.isError = true
    error.errorMessage.value = 'value' + err.message

    return error
  }
  return error
}

// check input phim lien quan
const checkRelateFilms = input => {
  const { id, page, records } = input
  let error = checkId(id)
  if (error.isError) {
    return error
  }
  error = checkPaging(page, records)
  if (error.isError) {
    return error
  }
  return error
}

module.exports = {
  checkGetAllFilms,
  checkFilterFilms,
  checkGetFilmById,
  checkSearchFilm,
  checkSearchFilmByField,
  checkSearchFilmByFieldInput,
  checkRelateFilms,
  Err
}
