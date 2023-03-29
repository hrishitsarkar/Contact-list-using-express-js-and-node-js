const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;
//conncting the database
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('assets'));
// app.use(function(req,res,next){
//     console.log("inside MW 1");
//     req.myName = "Hrishit";
//     next();
// });
// app.use(function(req,res,next){
//     console.log(req.myName);
//     console.log("inside MW 2");
//     next();
// })
 
var contactList = [
    {
       name : "Hrishit",
       phoneNo : "994874384"
},
{
    name : "Dipan",
    phoneNo : "997864384"
},
{
    name : "Subhendu",
    phoneNo : "9909874384"
}
];


app.get('/',function(req,res){

    Contact.find({}).then((contacts)=>{
        return res.render('home',{
            title : 'My Contacts',
            contact_list : contacts
        });
    }).catch((err)=>{
        console.log(err);
    });
        
    });
    

app.get('/practice',function(req,res){
    return res.render('practice',{
        title : "lets play tonight"
    })
})
//for deleting a contact
app.get('/delete-contact',function(req,res){
    //get the query from the url
   let phone = req.query.phoneNo;
   let contactIndex = contactList.findIndex(contact => contact.phoneNo == phone);
   if(contactIndex != -1){
    contactList.splice(contactIndex,1);
   }
return res.redirect('back');
})
app.post('/create-contact',function(req,res){
    // return res.redirect('/practice');
    // contactList.push({
    //     name : req.body.name,
    //     phoneNo : req.body.phoneNo
    // });
    // contactList.push(req.body);

Contact.create({
    name:req.body.name,
    phoneNo:req.body.phoneNo
}).then(()=>{
    return res.redirect('back');
}).catch((err)=>{
     console.log(err);
});

    // return res.redirect('/');
    // return res.redirect('back');
})


app.listen(port,function(err){
    if(err) console.log("error",err);
    console.log("my Express js server is running on port : " ,port);
})