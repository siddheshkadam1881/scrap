var request = require("request");
var fs = require("fs");
var htmlToJson = require("html-to-json");

request({
    uri: process.argv[2]
}, function(error, response, body) {
    //delete file if exists
    fs.unlink('webpage.html', function(notExist) {
        if (notExist) {
            console.log("Deleting file if exists...");
        }
    });
    //create and write file asynchronously
    fs.appendFile('webpage.html', body, function(err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });
    readFile();
});

function readFile()
{
var content;
// First I want to read the file
fs.readFile('webpage.html', function read(err, data) {
    if (err) {
         //throw err;
         console.log(err);
    }
    content =data;
    var promise = htmlToJson.parse(data.toString(), {
      'title': function ($doc) {
        return $doc.find('title').text();
      },
      'text': function ($doc) {
        return $doc.find('a').text();
      }
    }, function (err, result) {
      console.log(result);
    });

    promise.done(function (result) {

      //delete file if exists
      fs.unlink('webpage.txt', function(notExist) {
          if (notExist) {
              console.log("Deleting file if exists...");
          }
      });

      //Works as well
      fs.appendFile('webpage.txt', JSON.stringify(result), function(err) {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
      });
    });
});
}
