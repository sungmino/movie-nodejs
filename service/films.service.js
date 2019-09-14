const {
  getAllFilms,
  addFilm,
  getFilmById,
  searchFilm,
  deleteFilm,
  filterFilm,
  searchFilmByField,
  relateFilms
} = require('../data/films.data')

const {
  setAllFilmsToCache,
  setSearchFilmsToCache,
  getSearchFilmsFromCache,
  getFilterFilmFromCache,
  setFilterFilmToCache,
  getAllFilmsFromCache,
  setSearchFilmByFieldToCache,
  getSearchFilmByFieldFromCache,
  setRelateFilmToCache,
  getRelateFilmFromCache

} = require('../data/films.cache')

const {
  checkGetAllFilms,
  checkFilterFilms,
  checkGetFilmById,
  checkSearchFilm,
  checkSearchFilmByFieldInput,
  checkRelateFilms
} = require('./checkdata')

// Lay tat ca films
const getAllFilmsSV = async (req, res) => {
  const query = { ...req.query }
  console.log(query)
  var error = await checkGetAllFilms(query)
  if (error.isError) {
    return res.status(400).send({ error })
  }
  const { page, records } = req.query
  const input = { page, records }
  var films = await getAllFilmsFromCache(input)
  if (!films) {
    films = await getAllFilms(page, records)
    setAllFilmsToCache(page, records, films)
    if (!films || films.length === 0) {
      error.isError = true
      error.errorMessage.data = 'Not Found'

      return res.status(404).send({ error })
    }
  }
  console.log(films.allRecords)
  return res.status(200).send({
    films,
    allRecords: films.allRecords
  })
}

// them film
const addFilmSV = async (req, res) => {
  var input = { ...req.body }
  console.log(input)
  var error = await addFilm(input)
  if (error.isError) {
    return res.status(201).send({ error })
  }
}
// Lay phim theo Id

const getFilmByIdSV = async (req, res) => {
  var query = { ...req.query }
  const error = checkGetFilmById(query)
  if (error.isError) {
    return res.status(400).send({ error })
  }
  var { id } = req.query
  var film = await getFilmById(id)

  // console.log(film);

  if (!film || film.length === 0) {
    error.isError = true
    error.errorMessage = 'Not Found'

    return res.status(404).send({ error })
  }

  return res.status(200).send({ film })
}

// Tim kiem phim
const searchFilmSV = async (req, res) => {
  // console.log('hello')
  var query = { ...req.query }
  console.log(query)
  var error = await checkSearchFilm(query)
  if (error.isError) {
    return res.status(400).send({ error })
  }
  const { value, page, records } = req.query
  const input = { value, page, records }

  var data = await getSearchFilmsFromCache(input)
  if (!data) {
    data = await searchFilm(input, page, records)

    setSearchFilmsToCache(input, data)
    // console.log(data);
    if (!data || data.length === 0) {
      error.isError = true
      error.errorMessage.data = 'Not Found'

      return res.status(404).send({ error })
    }
  }
  return res.status(200).send({
    data
  })
}

// Tim kiem phim by field
const searchFilmByFieldSV = async (req, res) => {
  const {
    field,
    value,
    page,
    records
  } = req.query
  const query = { ...req.query }
  var error = await checkSearchFilmByFieldInput(query)
  if (error.isError) {
    return res.status(400).send({ error })
  }
  var input = { field, value, page, records }
  var films = await getSearchFilmByFieldFromCache(input)
  if (!films) {
    films = await searchFilmByField(input, page, records)
    if (!films || films.length === 0) {
      error.isError = true
      error.errorMessage.data = 'Not Found'
      return res.status(404).send({ error })
    } else {
      setSearchFilmByFieldToCache(input, films)
    }
  }
  console.log(films.allRecords)
  return res.status(200).send({
    films,
    allRecords: films.allRecords
  })
}

// Loc phim
const filterFilmSV = async (req, res) => {
  var {
    page,
    records,
    category,
    arrange,
    country,
    type,
    year
  } = req.query
  const input = {
    category,
    arrange: Number.parseInt(arrange),
    country,
    type,
    year,
    page,
    records
  }

  const query = { ...req.query }
  var error = checkFilterFilms(query)
  if (error.isError) {
    return res.status(400).send({ error })
  }
  var data = await getFilterFilmFromCache(input)
  if (!data) {
    data = await filterFilm(input, page, records)
    setFilterFilmToCache(input, data)
    //  console.log(data);
    if (!data || data.length === 0) {
      error.isError = true
      error.errorMessage.films = 'Not Found'

      return res.status(404).send({ error })
    }
  }
  console.log(data.allRecords)

  return res.status(200).send({
    data,
    allRecords: data.allRecords
  })
}

// phim lien quan
const relateFilmSV = async (req, res) => {
  const query = { ...req.query }
  var error = checkRelateFilms(query)
  if (error.isError) {
    return res.status(400).send({ error })
  }

  var { id, page, records } = req.query
  const input = { id, page, records }
  var films = await getRelateFilmFromCache(input)
  if (!films) {
    films = await relateFilms(input)

    if (!films || films.length === 0) {
      error.isError = true
      error.errorMessage.films = 'Not Found'

      return res.status(404).send({ error })
    } else {
      setRelateFilmToCache(input, films)
    }
  }
  console.log(films.allRecords)
  return res.status(200).send({
    films,
    allRecords: films.allRecords
  })
}

// Xoa phim
const deleteFilmSV = async (req, res) => {
  var { id } = req.query
  const error = new Error()

  await deleteFilm(id)
  if (error.isError) {
    return res.status(500).send({ error })
  }
  return res.status(200).send({ error })
}

module.exports = {
  getAllFilmsSV,
  addFilmSV,
  searchFilmSV,
  searchFilmByFieldSV,
  getFilmByIdSV,
  deleteFilmSV,
  filterFilmSV,
  relateFilmSV
}
