var fs = require('fs');
console.log(process.cwd())
let imgURL1 = fs.readFileSync('./db/test-IMGURL.txt', 'utf-8');
let imgURL2 = fs.readFileSync('./db/test-IMGURL2.txt', 'utf-8');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('frames').del()
    .then(function () {
      // Inserts seed entries
      return knex('frames').insert([
        {id: 1, flipbook_id: 1, index: 0, imgURL: imgURL1 },
        {id: 2, flipbook_id: 1, index: 1, imgURL: imgURL2 }
      ]).then(() => {
        return knex.raw(
          `SELECT setval('frames_id_seq', (SELECT MAX(id) FROM frames));`
        );
      });
    });
};
