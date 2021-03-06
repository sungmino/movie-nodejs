const { getDataFromRedis, storeToRedis, makeKey, makeKeyTotal } = require('../data/redis')

const {
  timeoutAllFilms,
  timeoutFilterFilms,
  timeoutSearchFilm,
  timeoutSearchFilmByField,
  limitedPagesCache,
  timeoutRelateFilms,
  timeoutTotalAllFilms,
  timeoutTotalFilterFilms,
  timeoutTotalSearchFilmsByField,
  timeoutTotalRelateFilms,
  timoutFilmId
} = require('../config/redis.config')
const fieldFilterFilms = ['category', 'arrange', 'country', 'type', 'year']
const fieldsAllFilms = ['allFilms']
const fieldSearchFilmByField = ['field', 'value']
const fieldSearchFilm = ['value']
const fieldFilmId = ['id']
const fieldRelateFilms = ['id']
const setAllFilmsToCache = async (page = 1, records = 24, films) => {
  if (page > limitedPagesCache) {
    return
  }

  console.log('set all films to cache')
  const key = makeKey({}, page, records, fieldsAllFilms)

  storeToRedis(key, films, timeoutAllFilms)
}

const getAllFilmsFromCache = input => {
  const { page = 1, records = 24 } = input
  if (page > limitedPagesCache) {
    return
  }
  console.log('get all films in cache')
  const key = makeKey({}, page, records, fieldsAllFilms)
  return getDataFromRedis(key)
}

// filter films
const setFilterFilmToCache = (input, films) => {
  const { page = 1, records = 24 } = input
  if (page > limitedPagesCache) {
    return
  }
  // console.log('set filter film to cache');
  const key = makeKey(input, page, records, fieldFilterFilms)
  storeToRedis(key, films, timeoutFilterFilms)
}

const getFilterFilmFromCache = (input) => {
  const { page = 1, records = 24 } = input
  if (page > limitedPagesCache) {
    console.log('get filter film from cache')

    const key = makeKey(input, page, records, fieldFilterFilms)
    return getDataFromRedis(key)
  }
}

const setSearchFilmsToCache = (input, films) => {
  const { page = 1, records = 24 } = input
  // If page <= limitedPagesCache, cache films, else dont cache
  if (page > limitedPagesCache) {
    return
  }

  const key = makeKey(input, page, records, fieldSearchFilm)

  storeToRedis(key, timeoutSearchFilm, films)
}

const getSearchFilmsFromCache = input => {
  const { page = 1, records = 24 } = input
  if (page > limitedPagesCache) {
    return
  }

  console.log('get search films in cache')

  // const key = makeKey({ input }, page, records, fieldSearchFilm);
  const key = makeKey({ input }, page, records, fieldSearchFilm)
  return getDataFromRedis(key)
}

const setSearchFilmByFieldToCache = (input, films) => {
  const { page = 1, records = 24 } = input
  if (page > limitedPagesCache) {
    return
  }

  console.log('set data search film to cache')
  const key = makeKey(input, page, records, fieldSearchFilmByField)

  storeToRedis(key, films, timeoutSearchFilmByField)
}

const getSearchFilmByFieldFromCache = input => {
  const { page = 1, records = 24 } = input
  if (page > limitedPagesCache) {
    return
  }
  console.log('get data search film from cache')
  const key = makeKey(input, page, records, fieldSearchFilmByField)
  return getDataFromRedis(key)
}

const setFilmIdToCache = (id, film) => {
  // const key = makeKeyTotal({ id: id}, fieldFilmId);
  const key = makeKeyTotal({ id: id }, fieldFilmId)
  storeToRedis(key, film, timoutFilmId)
}

const getFilmIdFromCache = id => {
  const key = makeKeyTotal({ id: id }, fieldFilmId)
  return getDataFromRedis(key)
}

const setRelateFilmToCache = (input, films) => {
  const { id, page = 1, records = 24 } = input
  if (page > 10) {
    return
  }

  // const key = makeKey({id}, page, records, fieldRelateFilms);
  const key = makeKey(id, page, records, fieldRelateFilms)
  storeToRedis(key, timeoutRelateFilms, films)
}

const getRelateFilmFromCache = input => {
  const { id, page = 1, records = 24 } = input
  if (page > 10) {
    return
  }

  const key = makeKey(id, page, records, fieldRelateFilms)
  return getDataFromRedis(key)
}

// ----------Total Records--------------------------
const setTotalAllFilmsToCache = allRecords => {
  const key = makeKeyTotal({}, fieldsAllFilms)
  storeToRedis(key, allRecords, timeoutTotalAllFilms)
}
const getTotalAllFilmsToCache = () => {
  const key = makeKeyTotal({}, fieldsAllFilms)
  return getDataFromRedis(key)
}
// ----
const setTotalSearchByFieldFilmsToCache = (input, allRecords) => {
  const key = makeKeyTotal(input, fieldSearchFilmByField)
  storeToRedis(key, allRecords, timeoutTotalSearchFilmsByField)
}
const getTotalSearchByFieldFilmsToCache = input => {
  const key = makeKeyTotal(input, fieldSearchFilmByField)
  return getDataFromRedis(key)
}
// ----
const setTotalFilterFilmsToCache = (input, allRecords) => {
  const key = makeKeyTotal(input, fieldFilterFilms)
  storeToRedis(key, allRecords, timeoutTotalFilterFilms)
}
const getTotalFilterFilmsToCache = input => {
  const key = makeKeyTotal(input, fieldFilterFilms)
  return getDataFromRedis(key)
}
// ----
const setTotalRelateFilmsToCache = (id, allRecords) => {
  const key = makeKeyTotal({ id }, fieldRelateFilms)
  storeToRedis(key, allRecords, timeoutTotalRelateFilms)
}
const getTotalRelateFilmsToCache = id => {
  const key = makeKeyTotal({ id }, fieldRelateFilms)
  return getDataFromRedis(key)
}
module.exports = {
  setAllFilmsToCache,
  getAllFilmsFromCache,
  setFilterFilmToCache,
  getFilterFilmFromCache,
  setSearchFilmsToCache,
  getSearchFilmsFromCache,
  getSearchFilmByFieldFromCache,
  setSearchFilmByFieldToCache,
  setFilmIdToCache,
  getFilmIdFromCache,
  setRelateFilmToCache,
  getRelateFilmFromCache,

  setTotalAllFilmsToCache,
  getTotalAllFilmsToCache,
  setTotalRelateFilmsToCache,
  getTotalRelateFilmsToCache,
  setTotalSearchByFieldFilmsToCache,
  getTotalSearchByFieldFilmsToCache,
  setTotalFilterFilmsToCache,
  getTotalFilterFilmsToCache
}
