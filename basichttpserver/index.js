const http = require('http');
const port = 8000;
const fs = require('fs');

function requestHandler(req,res){
    console.log(req.url);
    res.writeHead(200,{'content-type' : 'text/html' });
    let filePath;
    
    switch(req.url){
        case '/':
            filePath = './index.html';
            break;
        case '/profile':
            filePath = './profile.html';
            break;
        default :
            filePath = './404.html';
            break;
    }

    fs.readFile(filePath,function(err,data){
        if(err){
            console.log(err);
            return;
        }
        res.end(data);
    })



    // fs.readFile('./index.html',function(err,data){
    //     if(err){
    //         console.log(err);
    //         res.end('<h1>Sorry Error</h1>');
    //         return;
    //     }
    //     res.end(data);
    // });
    

    // res.end('<h1 style="color : red">response got!<h1>');
}

const server = http.createServer(requestHandler);

server.listen(port,function(error){
    if(error){
        console.log(error);
        return;
    }
    console.log("Server is up and running on port :" ,port);
})