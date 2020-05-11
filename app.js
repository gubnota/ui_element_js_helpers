#!/usr/local/bin/node
var path = require('path'), fs=require('fs');

function fromDir(startPath,filter,callback){

    console.log('Starting from dir '+startPath);

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter,callback); //recurse
        }
        else if (filter.test(filename)) callback(filename);
    };
};

console.log(['\033[1;32m', 'Searching for .html files', '\033[0m'].join(' '));
fromDir('.',/\.html$/,function(filename){
    console.log('-- found: ',filename);
    fs.readFile(filename, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      let result = data.replace(/https:\/\/github\.com\/gubnota\/ui_element_js_helpers\/blob\/master\/README\.md/g, '//gubnota.github.io/ui_element_js_helpers/')
      fs.writeFile(filename, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });

});
