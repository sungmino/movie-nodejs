const {
  getAllFilms,
  addFilm,
  getFilmById,
  searchFilm,
  deleteFilm,
  filterFilm,
  searchFilmByField
} = require('../data/films.data');

const {
  setAllFilmsToCache,
  setSearchFilmsToCache,
  getSearchFilmsFromCache,
  getFilterFilmFromCache,
  setFilterFilmToCache,
  getAllFilmsFromCache,
  setSearchFilmByFieldToCache,
  getSearchFilmByFieldFromCache

} = require('../data/films.cache');

const {
  checkGetAllFilms,
  checkFilterFilms,
  checkGetFilmById,
  checkSearchFilm,
  checkSearchFilmByField
} = require('./checkdata');
const error = {
  isError: false,
  errorMessage: ''
}
//Lay tat ca films
const getAllFilmsSV = async (req, res) => {
  // console.log('hello');
  const query = { ...req.query };
  var error = checkGetAllFilms(query);
  if (error.isError) {
    return res.status(400).send({ error });
  }
  const { page, records } = req.query;
  let films = await getAllFilmsFromCache(page, records);
  if(!films){
    const films = await getAllFilms(page, records);
    setAllFilmsToCache(page, records, films);
    if (!films || films.length === 0) {
      error.isError = true;
      error.errorMessage.data = 'Not Found';

      return res.status(404).send({ error });
    }
  }
  return res.status(200).send({films});
}

// them film
const addFilmSV = async (req, res) => {
  var input = { ...req.body };
  var error = await addFilm(input);
  if (error.isError) {
    return res.status(201).send({ error })
  }

}
// Lay phim theo Id

const getFilmByIdSV = async (req, res) => {
  var query = { ...req.query };
  let error = checkGetFilmById(query);
  if (error.isError) {
    return res.status(400).send({ error });
  }
  var { id } = req.query;
  var film = await getFilmById(id);

  console.log(film);

  if (!film || film.length === 0) {
    error.isError = true;
    error.errorMessage = 'Not Found'

    return res.status(404).send({ error })
  }

  return res.status(200).send({ film })
}

// Tim kiem phim
const searchFilmSV = async (req, res) => {
  // console.log('hello')
  const { value, page, records } = req.query;
  var query = { ...req.query };
  var error = checkSearchFilm(query);
  if (error.isError) {
    return res.status(400).send({ error });
  }
  const input = { value };

  let data = await getSearchFilmsFromCache(input, page, records)
  if (data) {
    return res.status(200).send({data});
  }else {
    const film = await searchFilm(input, page, records);

    setSearchFilmsToCache(input, page, records, film);
    console.log(film);
    if (!film || film.length === 0) {
      error.isError = true;
      error.errorMessage.data = 'Not Found';

      return res.status(404).send({ error });

    } else {
      return res.status(200).send({ film });
    }
  }
  }

// Tim kiem phim by field
const searchFilmByFieldSV = async (req, res) => {
  const {
    field,
    value,
    page,
    records
  } = req.query;

  const query = { ...req.query };
  var error = checkSearchFilmByField(query);
  if (error.isError) {
    return res.status(400).send({ error });
  }
  var input = { field, value }

  let data = {};

  data = await getSearchFilmByFieldFromCache(input, page, records);
  if (data) {
    return res.status(200).send({data});
  }else{
    let data = await searchFilmByField(input, page, records);
    setSearchFilmByFieldToCache(input, page, records, data);
    if (!data || data.films.length == 0 || !data.films == null) {
      error.isError = true;
      error.errorMessage.data = 'Not Found';
      return res.status(404).send({ error });
    } else {
      return res.status(200).send({ data });
    }
  }
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
    year } = req.query;
  const input = {
    category,
    arrange: Number.parseInt(arrange),
    country,
    type,
    year
  };

  const query = { ...req.query };
  error = checkFilterFilms(query);
  if (error.isError) {
    return res.status(400).send({ error });
  }
  var data = await getFilterFilmFromCache(input, page, records);
  if (data == null) {
    data = await filterFilm(input, page, records);
    setFilterFilmToCache(input, page, records, data);
  }

  //  console.log(data);

  if (!data || data.length == 0) {
    error.isError = true;
    error.errorMessage.films = 'Not Found'

    return res.status(404).send({ error });
  }

  return res.status(200).send({
    data
  });
}

//Xoa phim
const deleteFilmSV = async (id) => {
  var { id } = req.query;

  await deleteFilm(id);
  if (error.isError) {
    return res.status(500).send({ error });
  }
  return res.status(200).send({ error });


}


module.exports = {
  getAllFilmsSV,
  addFilmSV,
  searchFilmSV,
  searchFilmByFieldSV,
  getFilmByIdSV,
  deleteFilmSV,
  filterFilmSV
}