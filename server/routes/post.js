var express = require('express');
var router = express.Router();
const db = require('../databaseConfig');
const fs = require('fs');
/* GET users listing. */
router.get('/', async function (req, res, next) {
  const getPostsQuery = `SELECT * FROM post`;
  try {
    const posts = await db.query(getPostsQuery);
    res.send(posts);
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res, next) => {
  let { image, text, imageFile, id, imageUpdateOnly } = req.body;
  console.log(req.body);
  if(imageUpdateOnly && id && image){
    image = `${new Date().getTime()}.${image}`
    const updatePostImageQuery = `UPDATE post SET image = ? WHERE id = ?`; 
    fs.writeFileSync(`public/upload/${image}`,imageFile, {encoding: "base64"});
    try {
      await db.query(updatePostImageQuery, [image, id]);
      res.send({ success: { message: "Update post thành công!"} });
    }
    catch (err) {
      console.log(err);
      res.send({ error: { message: "Something error!"} });
    }
  }

  else if (id && text) {
    const updatePostQuery = `UPDATE post SET text = ?, updateAt= CURRENT_TIMESTAMP WHERE id = ?`;

    try {
      await db.query(updatePostQuery, [text, id]);
      res.send({ success: { message: "Update post thành công!" }});
    }
    catch (err) {
      console.log(err);
    }


  }
})

router.put('/', async (req, res, next) => {
  let { text, image, imageFile, noImagePost } = req.body;
  console.log(req.body);
  if(text && noImagePost){
    const createPostQuery = `INSERT INTO post(text) Values(?)`;
    try {
      await db.query(createPostQuery, [text]);
      res.send({ success: { message: "Tạo post thành công!"} });
    }
    catch (err) {
      console.log(err);
      res.send({ error: { message: "Something error!"} });
    }
  }
  else if (imageFile && text && image) {   
      image = `${new Date().getTime()}.${image}`
      const createPostQuery = `INSERT INTO post(text, image) Values(?, ?)`;
      fs.writeFileSync(`public/upload/${image}`,imageFile, {encoding: "base64"});
      try {
        await db.query(createPostQuery, [text, image]);
        res.send({ success: { message: "Tạo post thành công!"} });
      }
      catch (err) {
        console.log(err);
        res.send({ error: { message: "Something error!"} });
      }
  }
  
})

router.delete('/', async (req, res, next) => {
  const { id } = req.body;
  if (id) {
    
    
      const deletePostQuery = `DELETE FROM post WHERE id = ?`;
      try {
        await db.query(deletePostQuery, [id]);
        res.send({ success: { message: `Xóa post thành công!` }});
      }
      catch (err) {
        res.send({ error: { message: `Something went wrong!` }});
        console.log(err);
      }

    
  }
})

module.exports = router;
