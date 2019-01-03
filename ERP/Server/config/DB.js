const dotenv = require('dotenv');

dotenv.config();
module.exports = {
    //DB: 'mongodb://localhost:27017/ng6crud'
  
    DB: 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+ '@cluster0-yehxk.mongodb.net/ExpenseManager?retryWrites=true'
 };
