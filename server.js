// server.js
import http from 'http';
import fs from 'fs';
import path from 'path';
import axios from 'cors';


http.createServer(function (req, res) {
    var filePath = '.' + req.url;
    if (filePath == './') {
        filePath = './home.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';
   
    fs.readFile(filePath, function(err, data) {
        if (err) {
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: '+err.code+' ..\n');
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(data, 'utf-8');
        }
    });
}).listen(5000);

console.log('Server running at http://localhost:5000');
