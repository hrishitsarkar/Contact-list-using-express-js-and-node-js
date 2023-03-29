//require the libarary
const mongoose = require('mongoose');


//error

main().catch(err => console.log(err));



//connect to db
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db');
}

//acquire the connection to check if successfull 
const db = mongoose.connection;


//success
db.once('open',function(){
    console.log("successfully connected to db");
});
