const express = require('express');
const router = express.Router();
const db = require('../databaseConfig');
const fs = require('fs');
const FacebookDriver = require('../utils/FacebookBotActions');
require('chromedriver');
router.post('/post_pure_text_post', async (req, res, next) => {
    const { postInfo, accountInfo } = req.body;
    console.log(req.body);
    const selectAccountQuery = `SELECT username, password FROM account WHERE username IN (?)`
    
    try{
       const detailAccountInfo = await db.query(selectAccountQuery, [accountInfo])
       
       detailAccountInfo.forEach(async account => {
            const driver = new FacebookDriver();
            await driver.postPureTextPost(postInfo, account);
       })
       res.send({success: {message: "Ok"}});
    }catch(err){
        console.log(err);
        res.send({error: {message: "Something went wrong"}});
    }
   
})

router.post('/post_image_post', async (req, res, next) => {
    const { postInfo, accountInfo } = req.body;
    console.log(req.body);
    const selectAccountQuery = `SELECT username, password FROM account WHERE username IN (?)`
    
    try{
       const detailAccountInfo = await db.query(selectAccountQuery, [accountInfo])
       
       detailAccountInfo.forEach(async account => {
            const driver = new FacebookDriver();
            await driver.postImagePost(postInfo, account);
       })
       res.send({success: {message: "Ok"}});
    }catch(err){
        console.log(err);
        res.send({error: {message: "Something went wrong"}});
    }
})


module.exports = router;