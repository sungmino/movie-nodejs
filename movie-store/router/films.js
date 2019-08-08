const express = require('express');
const {
  getAllFilmsService,
  addFilmService,
  searchFilmService,
  getFilmByIdService,
  deleteFilmService,
  filterFilmService
} = require('../service/films.service');
const router = express.Router();

//Lay toan bo phim
router.get('/', async (req, res) => {
  const { page, records } = req.query;
  const { error, films } = await getAllFilmsService(page, records);
  if (error.isError) {
    return res.status(500).send({ error});
  }
  if (!films || films.length === 0) {
    error.isError = true;
    error.errorMessage.films = 'Not Found';

    return res.status(404).send({error});
  }
  return res.status(200).send({
    error,
    films
  });
})

//Them 1 phim
router.post('/', async (req, res) => {
  let error = {
    isError: false,
    errorMessage: {}
  };
  const input = {...req.body};
  error = await addFilmService(input);
  if(error.isError) {
    return res.status(201).send({error});
  }
  return res.status(201).send({error});
});

//Lay phim theo id
router.get('/id', async (req, res) => {
  const {id} = req.query;

  const check = checkId(id);
  if(check.isError) {
    return res.status(400).send({error: check});
  }
  const { error, film } = await getFilmByIdService(id);
  if(error.isError){
    return res.status(500).send({error});
  }
  if (!film) {
    error.isError = true;
    error.errorMessage.film = 'Not Found';
    return res.status(404).send({error});
  }
  return res.status(200).send({
    error,
    film
  });
});

//search phim
router.get('/search', async (req, res) => {
  const { value, page, records } = req.query;
  const { error, films } = await searchFilmService(value, page, records);
  if(error.isError){
    return res.status(500).send({error});
  }
  if  (!film) {
    error.isError = true;
    error.errorMessage.film = 'Not Found';
    return res.status(404).send({error});
  }
  return res.status(200).send({
    error,
    films
  });
});

//xoa phim
router.delete('/', async (req, res) => {
  let error = {
    isError: false,
    errorMessage: {}
  };
  const {id} = req.query;
  error = await deleteFilmService(id);
  if(error.isError){
    return res.status(500).send({error});
  }
   return res.status(200).send({error});

});


// router.patch('/', async(req, res) => {
//   let error = {
//     isError: false,
//     errorMessage: {}
//   };

//   const {id} = req.query;
//   const input = { ...req.body };

//   error = checkId(id);
//   if (error.isError) {
//     return res.status(400).send({ error });
//   }

//   error = checkUpdate
// })

router.get('/filter', async (req, res) => {
  const {page, records, category, arrange, country, type, year } = req.query;
  const input = {category, arrange: Number.parseInt(arrange), country, type, year};

  const {error, films} = await filterFilmService(input, page, records);
  if(error.isError) {
    return res.status(500).send({error});

  }

  if(!films || films.length === 0) {
    error.isError = true;
    error.errorMessage.films = 'Not Found'
    return res.status(404).send({error});
  }

  return res.status(200).send({
    error,
    films
  });
});


module.exports = router;