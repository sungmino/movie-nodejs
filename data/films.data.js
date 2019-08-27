const Film = require('../service/film.model');

//Lay toan bo phim
const getAllFilms = async (page = 1, records = 24) => {
    page = Number.parseInt(page);
    records = Number.parseInt(records);

    const films = await Film
    .find({})
    .skip((page - 1) * records)
    .limit(records);
return {
  films
}

}

//Them 1 phim
const addFilm = async input => {
    const film = new Film({
    title: input.title,
    supportedResolution: input.supportedResolution,
    dateReleased: input.dateReleased,
    dateCreated: input.dateCreated,
    dateUpdated: input.dateUpdated,
    category: input.category,
    country: input.country,
    time: input.time,
    episodeNumber: input.episodeNumber,
    imdb: input.imdb,
    scripts: input.scripts,
    directors: input.directors,
    characters: input.characters,
    description: input.description,
    trailer: input.trailer,
    image: input.image,
    thumb: input.thumb,
    type: input.type,
    links: input.links,
    ratingNumber: input.ratingNumber,
    views: input.views,
    tags: input.tags,
    content: input.content
    });

    return film.save();
}

//Lay phim theo id
const getFilmById = id => {
    return Film.findById(id);
}

// Search phim by field

const searchFilmByField = async (input, page = 1, records = 24) => {
  page = Number.parseInt(page);
  records = Number.parseInt(records);
  const { field, value } = input;

  let query = {};

  query[field] = new RegExp(value, 'i');

  const films = await Film
    .find({
      ...query
    })
    .skip((page - 1) * records)
    .limit(records);
  
  return {
    films
  }
}

// Tim kiem phim
const searchFilm = async (input, page = 1, records = 24) => {
    page = Number.parseInt(page);
    records = Number.parseInt(records);
    
    search = new RegExp(input.value, 'i');
    const films = await Film
      .find({
          $or: [
              {"title.title_vn": search},
              {"title.title_en": search},
              {directors: search},
              {characters: search},
              {tags: search}
          ]
      })
      .skip((page - 1) * records)
      .limit(records);
    return films;
}

//xoa phim
const deleteFilm = id => {
    return Film.findByIdAndRemove(id);
 }

const filterFilm = async (input, page = 1, records = 24) => {
   const fields = ['category', 'country', 'type'];
   let query = {};
   let where = null;
   let sort = {};
   fields.forEach(field => {
       if(input[field]) {
        query[field] = new RegExp(input[field], 'i');
       }

   });

   where = input.year ? `this.dateReleased.getFullYear() == ${input.year}`: `/./`;
switch (input.arrange) {
    case 0: 
      console.log('sort by dateCreate:');
      sort = {dateCreated: -1};
      break;
    case 1: 
      console.log('sort by dateReleased:');
      sort = {dateReleased: -1};
      break;
    case 2: 
      console.log('sort by title:');
      sort = {title: 1};
      break;
    case 3: 
      console.log('sort by imdb:');
      sort = {imdb: -1};
      break;
    case 4: 
      console.log('sort by views:');
      sort = {views: -1};
      break;
    case 5:
        console.log('sort by ratingNumber:');
        sort = {ratingNumber: -1};
        break;
    default:
        console.log('sort by title:');
        sort = {title: -1};

    
}

let films = await Film
   .find({
       ...query,
       $where: where
   })
   .sort({...sort})
   .skip((page -1) * records)
   .limit(records)

   return {
       films
   };
}

//Phim lien quan
 const relateFilms = async (id) => {
   
 }
  module.exports = {
    getAllFilms,
    addFilm,
    getFilmById,
    searchFilm,
    deleteFilm,
    filterFilm,
    searchFilmByField,
    relateFilms

  }