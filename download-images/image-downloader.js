var fs = require('fs');
const { request } = require('http');
    request = require('request');

var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type:']);
        console.log('content-length:', res.headers['content-length:']);

        request(uri).pipe(fs.createWriteStream(firename)).on('close', callback);
    });
};

module.exports = {
    download
};