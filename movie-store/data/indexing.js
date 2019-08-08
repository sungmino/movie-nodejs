const colors = require('colors');
const lunr = require('lunr');

const indexFilms = (app) => {
  // index all film in lunr on startup
  return new Promise((resolve, reject) => {
    app.db.collection('film').find({}).toArray((err, filmsList) => {
      if(err){
        console.error(colors.red(err.stack));
        reject(err);
      }


      // thiey lap indexing
      const filmsIndex = lunr(function(){
        this.field('title');
        this.field('type');
        this.field('category');
        
        const lunrIndex = this;
         //add to lunr index
         filmsList.forEach((film) => {
           const doc = {
             title: film.title,
             type: film.type,
             category: film.category,
             id: film._id
           };
           lunrIndex.add(doc)
           
         });

      });

      app.filmsIndex = filmsIndex;
      console.log(colors.cyan('- Film indexing complete'));
      resolve();
    });
  });
};

module.exports.indexFilms = indexFilms;