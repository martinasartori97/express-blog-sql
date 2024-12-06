
const posts = require('../db.js')
const fs = require('fs')
const connection = require("../db/connection.js");
const { post } = require('../routes/posts.js');


const index = (req, res) => {
  const sql = "SELECT * FROM posts";

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    const responseData = {
      data: results,
      counter: results.length
    };
    res.status(200).json(responseData)
  });

};






const destroy = (req, res) => {

  // console.log(req.params);
  const id = req.params.id
  const sql = 'DELETE FROM POSTS WHERE id=?'
  connection.query(sql, [id], (err, results) => {
    console.log(err, results);
    if (err) return res.status(500).json({ error: err })

    if (results.affectedRows === 0) return res.status(404).json({ error: `404! No post found with the this id: ${id}` })

    return res.json({ status: 204, affectedRows: results.affectedRows })
    console.log(req.params);


  })
}









// const index = (req, res) => {
//   res.json({ data: posts, count: posts.length })
// }


// const show = (req, res) => {
//   console.log(req.params.slug);

//   const FoundPost = posts.find((post) => post.slug === req.params.slug)
//   if (!FoundPost) {
//     return res.status(404).json({ error: "No posts found with that slug " })
//   }
//   return res.status(200).json({ data: FoundPost })
// }


const store = (req, res) => {

  // create the new post object
  const post = {
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags
  };



  posts.push(post)

}



const update = (req, res) => {
  console.log(req.params);

  const FoundPost = posts.find((post) => post.slug === req.params.slug);
  if (!FoundPost) {
    return res.status(404).json({ error: "No post found with that slug" })
  }
  FoundPost.title = req.body.title
  FoundPost.slug = req.body.slug
  FoundPost.content = req.body.content
  FoundPost.image = req.body.image
  FoundPost.tags = req.body.tags

  fs.writeFileSync('./db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)
  return res.status(201).json({
    status: 201,
    data: posts,
    count: posts.length
  })

}


// const destroy = (req, res) => {
//   const foundPost = posts.find(post => post.slug === req.params.slug);
//   if (!foundPost) {
//     return res.status(404).json({ error: "No posts found with that slug" })
//   }
//   const newPosts = posts.filter((posts) => posts.slug !== req.params.slug);
//   fs.writeFileSync('./db.js', `module.exports = ${JSON.stringify(newPosts, null, 4)}`)

//   res.status(200).json({
//     status: 200,
//     data: newPosts,
//     counter: newPosts.length
//   })
// }


const notFoundMiddleware = (req, res, next) => {
  res.status(404).send("Sorry can't find that!")
}


const loggerMiddleware = (req, res, next) => {
  const now = new Date().toString();
  console.error(`
    Date: ${now} 
    Method: ${req.method} 
    URL: ${req.url}`);


  next();

}



module.exports = notFoundMiddleware;
module.exports = loggerMiddleware;




module.exports = {
  index,
  show,
  store,
  update,
  destroy
}

