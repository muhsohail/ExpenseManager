const dotenv = require('dotenv');

dotenv.config();
module.exports = {
    ConnectionString: 'mongodb://localhost:27017/ng6crud'  
    //ConnectionString: 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+ '@cluster0-yehxk.mongodb.net/ExpenseManager?retryWrites=true'
    
 };