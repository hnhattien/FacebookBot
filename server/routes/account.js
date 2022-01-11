var express = require('express');
var router = express.Router();
const db = require('../databaseConfig');
const { checkIsAccountExisted } = require('../utils');
/* GET home page. */
router.get('/', async function(req, res, next) {
  const getAccountsQuery = `SELECT * FROM account`;
  try{
    const accounts = await db.query(getAccountsQuery);
    res.send(accounts);
  }catch(err){
      console.log(err);
  }
});

router.post('/', async(req, res, next) => {
    let {username, password, id} = req.body;
    if(username && password && id){
        username = username.toLowerCase();
       
        const updateAccountQuery = `UPDATE account SET username = ?, password = ?, updateAt = CURRENT_TIMESTAMP WHERE id = ?`;
    
        try{
            const account = await db.query(updateAccountQuery, [username, password, id]);
            res.send({success: {message: "Update tài khoản thành công!"}, account});
        }
        catch(err){
            console.log(err);
        }
    
        
    }
})

router.put('/', async (req, res, next) => {
    let { username, password } = req.body;
    
    if(username && password){
        username = username.toLowerCase();
        const isExistedAccount = await checkIsAccountExisted(username);
        if(isExistedAccount){
            res.send({error: {message: "Tài khoản  đã tồn tại."}});
        }
        else{
            const createAccountQuery = `INSERT INTO account(username, password) Values(?, ?)`;
            try{
                const account = await db.query(createAccountQuery, [username, password]);
                res.send({success: {message: "Tạo tài khoản thành công!", account}});
            }
            catch(err){
                console.log(err);
            }
        }
    }
})

router.delete('/', async (req, res, next) => {
    const { username, id } = req.body;
    if(username && id){
        const isExistedAccount = await checkIsAccountExisted(username);
        if(isExistedAccount){
            const createAccountQuery = `DELETE FROM account WHERE id = ?`;
            try{
                const account = await db.query(createAccountQuery, [id]);
                res.send({success: {message: `Xóa tài khoản ${username} thành công!`}, account});
            }
            catch(err){
                console.log(err);
            }
            
        }
        else{
            res.send({error: {message: `Tài khoản có username: ${username} không tồn tại.`}});
        }
    }
})

module.exports = router;
