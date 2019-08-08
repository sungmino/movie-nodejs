const {
  getAllFilms,
  addFilm,
  getFilmById,
  searchFilm,
  deleteFilm,
  filterFilm
} = require('../data/films.data');

const {
  setAllFilmsToCache,
  getFilteFilmFromCache,
  setFilterFilmToCache,
  getAllFilmsFromCache
} = require('../data/films.cache');

const getAllFilmsService = async (page, records) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    let data = {};
    data = await getAllFilmsFromCache(page, records);
    if(!data){
      data = await getAllFilms(page, records);
      setAllFilmsToCache(page, records, data);
    }
    return {
      error,
      films: data.films
    }
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;
    return {
      error
    };
  }
}

const addFilmService = async input => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    await addFilm(input);

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;
    return error;
  }
}
 const getFilmByIdService = async id => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    film = await getFilmById(id);
    return {
      error,
      film
    }
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;
    return {
      error
    };
  }
 }

 const searchFilmService = async (value, page, records) => {
  let error = {
    isError: false,
    errorMessage: {}
  }
  try {
    let data = {};
    const input = { value }
    
    data = await searchFilm(input, page, records);
    return {
      error,
      films: data.films
    }
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;
    return {
      error
    };
  }
 }

const filterFilmService = async (input, page, records) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    let data = {};
  data = await getFilteFilmFromCache(input, page,records);
  if(!data) {
    data = await filterFilm(input, page, records);
    setFilterFilmToCache(input, page, record, data);
  }

  return {
    error,
    films: data.films
  }
} catch(err){
  error.isError =  true,
  error.errorMessage.database = err.message;
  return {
    error
  };
}

  
}

 const deleteFilmService = async id => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    await deleteFilm(id);
    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;
    return {
      error
    };
  }
 }

 module.exports = {
  getAllFilmsService,
  addFilmService,
  searchFilmService,
  getFilmByIdService,
  deleteFilmService,
  filterFilmService
 }