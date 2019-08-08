const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/movie', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const autoIncrement = require('mongoose-auto-increment');
const filmsSchema = new Schema({
  title: {
    type: Object,
    required: true
  },
  supportedResolution: {
    type: Array,
    required: false,
    default: null
  },
  dateReleased: {
    type: Date,
    required: false,
    default: null
  },
  dateCreated: {
    type: Date,
    required: false,
    default: Date.now()
  },
  dateUpdated: {
    type: Date,
    required: false,
    default: Date.now()
  },
  category: {
    type: Array,
    required: true
  },
  country: {
    type: String,
    requried: false,
    trim: true,
    lowercase: true,
    default: null
  },
  time: {
    type: Number,
    required: false,
    default: null
  },
  episodeNumber: {
    type: Number,
    required: true
  },
  imdb: {
    type: Number,
    required: false,
    default: null
  },
  scripts: {
    type: Array,
    required: true
  },
  directors: {
    type: Array,
    required: true
  },
  characters: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  trailer: {
    type: String,
    requried: false,
    trim: true,
    default: null
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  thumb: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: Array,
    required: true
  },
  links: {
    type: Array,
    required: true
  },
  ratingNumber: {
   type: Number,
   required: true,
   default: 0
  },
  views: {
    type: Number,
    required: true,
    default: 0
  },
  tags: {
    type: Array,
    required: true
  },
  content: {
    type: String,
    require: false,
    default: null
  }
});
module.exports = Film = mongoose.model('films', filmsSchema);
//add film
// const newFilm = new Film({
//   title: {
//     title_en: "english",
//     title_vn: "vietname"
//   },
//   supportedResolution: ['144', '480', '720', '1080'],
//   // dateReleased: '28/8/2019',
//   category: ['De cu', 'phim bo', 'phim le'],
//   country: 'Viet Nam',
//   time: '',
//   episodeNumber: 1,
//   imdb: 10,
//   scripts: ['Not info'],
//   directors: ['Not'],
//   characters: ['No', 'nhung nguoi ban'],
//   description: 'Phim ve Duy va nhung nguoi ban',
//   trailer: 'No',
//   image: '1234.jpg',
//   thumb: '1232.jpg',
//   type:['Vien tuong', 'Khoa hoc', 'Kinh di'],
//   links: ['youtube.com.vn'],
//   ratingNumber: 0,
//   views: 0,
//   tags: ['tai lieu'],
//   content: 'Phim hay'
// });
// newFilm.save((err, newUser) => {
//   if (err) throw err;
//   console.log(newFilm)
// })