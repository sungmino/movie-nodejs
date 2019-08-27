const express = require('express');

const {
  getAllFilmsSV,
  addFilmSV,
  searchFilmSV,
  getFilmByIdSV,
  deleteFilmSV,
  filterFilmSV,
  searchFilmByFieldSV
} = require('../service/films.service');
const router = express.Router();

//Lay toan bo phim
router.get('/', getAllFilmsSV);

//Lay phim theo id
router.get('/id', getFilmByIdSV);

// Search phim
router.get('/search', searchFilmSV );

// Search phim by field
router.get('/search/field', searchFilmByFieldSV);

// xoa phim
router.delete('/', deleteFilmSV);

// Loc phim
router.get('/filter', filterFilmSV);

//Them 1 phim
router.post('/', addFilmSV );
//   let error = {
//     isError: false,
//     errorMessage: {}
//   };
//   const input = {...req.body};
//   error = await addFilmSV(input);
//   if(error.isError) {
//     return res.status(201).send({error});
//   }
//   return res.status(201).send({error});
// });
module.exports = router;