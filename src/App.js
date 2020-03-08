import React, { useState, useEffect } from 'react';
import 'aframe/dist/aframe-master';
import CurvedImage from './Components/CurvedImage';
import dataRaw from './data.json';

function App() {

  let first5 = [];
  for (let i = 0; i < 5; i++) {
    first5.push(dataRaw[i]);
  }

  let [data, setData] = useState(dataRaw)

  data.map((student, key) => {
    student.i = key;
    console.log(student);
    student.imageSrc = student.thumbnail_image !== null && student.thumbnail_image.src !== null ? student.thumbnail_image.src : student.slide_show[0].src;
    student.size = { width: 320, height: 200 };
  })

  return (
    <div >
      <a-scene vr-mode-ui="enabled: true" background="color: #000" loading-screen="dotsColor: gray; backgroundColor: #131A24" >
        <a-assets>
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"></img>
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"></img>
          <img id="shadow2" src="radial-shadow-2.png"></img>
        </a-assets>
        <a-sky id="bg" radius="30" src="#skyTexture" theta-length="90"></a-sky>
        <a-cylinder id="ground" src="#groundTexture" radius="32" height="0.1" position="0 -5 0"></a-cylinder>
        <a-entity light="angle: 0; decay: 1.1; distance: 20; type: point"></a-entity>

        {data.map((student, key) => {
          return <CurvedImage student={student} key={key} />
        })}

        <a-image position="0 -5 0" src="#shadow2" rotation="-90 0 0" scale="6 6 6"></a-image>
        <a-entity position="0 0 0">
          <a-camera wasd-controls="fly:  true">
            
            <a-entity light="angle: 0; decay: 1.5; distance: 10; type: point"></a-entity>
          </a-camera>
        </a-entity>
      </a-scene>

    </div>
  );
}

export default App;
