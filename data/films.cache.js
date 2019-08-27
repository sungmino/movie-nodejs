const { getDataFromRedis, storeToRedis, makeKey, makeKeyTotal  } = require('../data/redis');

const {timeoutAllFilms, timeoutFilterFilms, timeoutSearchFilm, timeoutSearchFilmByField} = require('../config/redis.config');
const fieldFilterFilms = ['category', 'arrange', 'country', 'type', 'year'];
const fieldsAllFilms = ['allFilms'];
const fieldSearchFilmByField = ['field', 'value'];
const fieldSearchFilm = ['value'];
const fieldRelatedFilms = ['id'];

const setAllFilmsToCache = (page = 1, records = 24, films) => {
  if (page > 10) {
    return;
  }

  // console.log('set all films to cache');
  const key = makeKey({}, page, records, fieldsAllFilms);

  storeToRedis(key, films, timeoutAllFilms);
}

const getAllFilmsFromCache = (page = 1, records = 24) => {
  if (page > 10) {
    return;
  }
  console.log('get all films in cache');
  const key = makeKey({}, page, records, fieldsAllFilms);
  return getDataFromRedis(key);
}

const setFilterFilmToCache = (input, page = 1, records = 24, films) => {
  if(page > 10) {
    return;
  }
  console.log('set filter film to cache');
  const key = makeKey(input, page, records, fieldFilterFilms);
  storeToRedis(key, films, timeoutFilterFilms);

}

const getFilterFilmFromCache = (input, page = 1, records = 24) => {
  if (page > 10) {
    console.log('get filter film from cache');

    const key = makeKey(input, page, records, fieldFilterFilms);
    return getDataFromRedis(key);
  }
}

const setSearchFilmsToCache = (input, page = 1, records = 24, films) => {
  // If page <= 10, cache films, else dont cache
  if (page > 10) {
    return;
  }

  console.log(input)

  console.log('set search films to cache');

  const key = makeKey(input, page, records, fieldSearchFilm);

  storeToRedis(key, films, timeoutSearchFilm);
}

const getSearchFilmsFromCache = (input, page = 1, records = 24) => {
  if (page > 10) {
    return ;
  }

  console.log('get search films in cache');

  const key = makeKey({ input }, page, records, fieldSearchFilm);
  return getDataFromRedis(key);
}

const setSearchFilmByFieldToCache = (input, page = 1, records = 24, films) => {
  if (page > 10) {
    return;
  }

  console.log('set search film by field to cache');
  const key = makeKey(input, page, records, fieldSearchFilmByField);

  storeToRedis(key, films, timeoutSearchFilmByField);
}

const getSearchFilmByFieldFromCache = (input, page = 1, records = 24) => {
  if (page > 10) {
    return;
  }

  console.log('get search film by field from cache');
  const key = makeKey(input, page, records, fieldSearchFilmByField);
  return getDataFromRedis(key);
}
module.exports = {
  setAllFilmsToCache,
  getAllFilmsFromCache,
  setFilterFilmToCache,
  getFilterFilmFromCache,
  setSearchFilmsToCache,
  getSearchFilmsFromCache,
  getSearchFilmByFieldFromCache,
  setSearchFilmByFieldToCache
}