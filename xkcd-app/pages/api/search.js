// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const comics = require('../../comics/index.json');
export default function handler(req, res) {
  const { query : { q } } = req;
  let results = []
  if(q || q.length !== 0 ) {
    results = comics.filter( comic => comic.id.toString().includes(q) || comic.title.includes(q) || comic.img.includes(q) || comic.alt.includes(q))
  }
  res.status(200).json(results)
}
