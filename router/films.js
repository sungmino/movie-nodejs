const express = require('express')

const {
  getAllFilmsSV,
  addFilmSV,
  searchFilmSV,
  getFilmByIdSV,
  deleteFilmSV,
  filterFilmSV,
  searchFilmByFieldSV,
  relateFilmSV
} = require('../service/films.service')
const router = express.Router()

// Lay toan bo phim
router.get('/', getAllFilmsSV)

// Lay phim theo id
router.get('/id', getFilmByIdSV)

// Search phim
router.get('/search', searchFilmSV)

// Search phim by field
router.get('/search/field', searchFilmByFieldSV)

// xoa phim
router.delete('/', deleteFilmSV)

// Loc phim
router.get('/filter', filterFilmSV)

// Them 1 phim
router.post('/', addFilmSV)

// phim lien quan
router.get('/relate', relateFilmSV)
module.exports = router
