
let fs = require("fs");
let path = require("path");
var sizeOf = require('image-size');
let base64Img = require('base64-img');
const fetch = require('node-fetch');
var request = require('request').defaults({ encoding: null });
var probe = require("probe-image-size");

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

// let rawdata = fs.readFileSync(path.resolve(__dirname, "./src/data.json"));
// let data = JSON.parse(rawdata);

async function toBase64() {
    let rawdata = fs.readFileSync(path.resolve(__dirname, "./src/data.json"));
    let data = JSON.parse(rawdata);

    let myFirstPromise = new Promise(async (resolve, reject) => {

        for (let i = 0; i < data.length; i++) {
            let student = data[i];
            let imageSrc = student.thumbnail_image !== null && student.thumbnail_image.src !== null ? student.thumbnail_image.src : student.slide_show[0].src;
            data[i].imageSrc = imageSrc;
            let r = await returnBase64(imageSrc);
            data[i].base64Img = r.base64Img;
            data[i].size = r.size;

            // console.log(data[i].base64Img);
            console.log(i)
        }
        resolve(data);
    })
    let d = await myFirstPromise;
    return d;
}


async function returnBase64(imageSrc) {
    let r = {};
    let myFirstPromise = new Promise((resolve, reject) => {

        request.get(encodeURI(imageSrc), function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                r.base64Img = data;
                // console.log(r);
                probe(encodeURI(imageSrc)).then((res) => {
                    // console.log(res);
                    r.size = res;
                    resolve(r)
                })

            }
        });
    })
    let d = await myFirstPromise;
    // console.log(d);
    return d;
}

async function caller() {
    let d = await toBase64();
    console.log(d[d.length - 1].size);
    let jsonContent = JSON.stringify(d);
    fs.writeFile("data_base64.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
}

function downloadImages() {
    let rawdata = fs.readFileSync(path.resolve(__dirname, "./src/data_base64.json"));
    let data = JSON.parse(rawdata);
    data.map((student, i) => {
        let imageSrc = student.thumbnail_image !== null && student.thumbnail_image.src !== null ? student.thumbnail_image.src : student.slide_show[0].src;
        data[i].imageSrc = imageSrc;
        let ext = imageSrc.match(/\.[0-9a-z]+$/i)[0];
        let thumbnailName = `id${i}${student.student_slug.replace(/([^A-Za-z])/g, '')}${ext}`;
        let folderName = "thesis2019/";
        console.log(thumbnailName);
        // download(encodeURI(imageSrc), folderName+thumbnailName, ()=>{
        //     console.log(i);            
        // })
        ext = ".jpg";
        thumbnailName = `id${i}${student.student_slug.replace(/([^A-Za-z])/g, '')}${ext}`;
        data[i].thumbnailName = thumbnailName;
        console.log(data[i].thumbnailName);
        delete data[i].base64Img;
    })
    let jsonContent = JSON.stringify(data);
    fs.writeFile("data_with_file_path.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });


}

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};



downloadImages()

