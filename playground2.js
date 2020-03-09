const fs = require('fs');
const path = require('path');

let rawdata = fs.readFileSync(path.resolve(__dirname, "./src/data.json"));
let data = JSON.parse(rawdata);

let seeking = 'video_documentation_url'

let has = 0, not=0;

data.map((student)=>{
    
    if(!student[seeking]) not += 1;
    else has+=1
})

console.log(`${not} people no ${seeking}`);
console.log(`${has} people has ${seeking}`);
