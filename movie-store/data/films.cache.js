const { getDataFromRedis, storeToRedis, makeKey, makeKeyTotal  } = require('../data/redis');

const {timeoutAllFilms} = require('../config/redis.config');
const fieldFilterFilms = ['category', 'arrage', 'country', 'type', 'year'];
const fieldsAllFilms = ['allFilms'];
const fieldSearchFilm = ['value'];
const fieldRelatedFilms = ['id'];

const setAllFilmsToCache = (page = 1, records = 24, films) => {
  if (page > 10) {
    return;
  }

  console.log('set all films to cache');
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
  storeToRedis(key, films);

}

const getFilterFilmFromCache = (input, page = 1, records = 24) => {
  if (page > 10) {
    console.log('get filter film from cache');

    const key = makeKey(input, page, records, fieldFilterFilms);
    return getDataFromRedis(key);
  }
}
module.exports = {
  setAllFilmsToCache,
  getAllFilmsFromCache,
  setFilterFilmToCache,
  getFilterFilmFromCache
}