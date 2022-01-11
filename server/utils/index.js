const db = require('../databaseConfig/');
const checkIsAccountExisted = async (username) => {
    const checkQuery = `SELECT * FROM account WHERE lower(username)=?`;
    try{
        const account = await db.query(checkQuery, [String(username).toLowerCase()]);
        console.log(account)
        if(account.length !== 0){
            return true;
        }
        else{
            return false;
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {checkIsAccountExisted}