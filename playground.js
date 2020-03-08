
let fs = require("fs");
let path = require("path");
var sizeOf = require('image-size');


function App() {

    let imageDir = "./public/Thesis2018files/"
    let metas = [];
    let files = fs.readdirSync(imageDir);
    files = files.filter(fileName => fileName != ".DS_Store");

    files.map((fileName, i) => {
        let meta = {};
        meta.i = i;
        meta.id = fileName.replace(/ /g, '');
        meta.fileName = fileName;
        meta.filePath = path.join(imageDir, fileName);
        console.log(meta.filePath);
        try {
            let size = sizeOf(meta.filePath);
            meta.size = size;
        } catch (error) {
            let buf = fs.readFileSync(meta.filePath);
            let size = sizeOf(buf);
            meta.size = size;
        }
        metas.push(meta);
    })

    var jsonContent = JSON.stringify(metas);
    console.log(jsonContent);

    fs.writeFile("filesMeta.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });



}

App();