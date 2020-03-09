import React, { useState, useEffect } from 'react';
import "./App.css";
import 'aframe/dist/aframe-master';
import 'aframe-proxy-event-component/dist/aframe-proxy-event-component';
import 'aframe-extras/dist/aframe-extras.controls';
import CurvedImage from './Components/CurvedImage';
// import dataRaw from './data.json';
// import dataWithBase64 from './data_base64.json';
import data_with_file_path from "./data_with_file_path.json";
import registerComponents from "./Components/AFrameCustomComponent";
import registerCustomLookControl from "./Components/CustomLookControl";

import DetailPage from "./Components/DetailPage";


const myEmitter = registerComponents();
registerCustomLookControl();

function App() {

  let first5 = [];
  for (let i = 0; i < 5; i++) {
    first5.push(data_with_file_path[i]);
  }
  
  let [data, setData] = useState(data_with_file_path)


  data.map((student, key) => {
    student.i = key;
    student.imageSrc = student.thumbnail_image !== null && student.thumbnail_image.src !== null ? student.thumbnail_image.src : student.slide_show[0].src;
    // student.size = { width: 320, height: 200 };
  })

  return (
    <div >
      <div id="vr" style={{ height: '60px' }}>
      </div>
      <DetailPage data={data} myEmitter={myEmitter}/>
      <a-scene vr-mode-ui="enabled: true" background="color: #000" loading-screen="dotsColor: gray; backgroundColor: #131A24" >

        <a-sky id="bg" radius="30" material="src: url(https://cdn.aframe.io/a-painter/images/sky.jpg)" theta-length="90"></a-sky>
        <a-cylinder id="ground" material="src: url(https://cdn.aframe.io/a-painter/images/floor.jpg)" radius="32" height="0.1" position="0 -5 0"></a-cylinder>
        <a-entity light="angle: 0; decay: 1.1; distance: 20; type: point"></a-entity>

        {data.map((student, key) => {
          return <CurvedImage student={student} key={key} />
        })}

        <a-image position="0 -4 0" material="src: url(radial-shadow-2.png)" rotation="-90 0 0" scale="6 6 6"></a-image>
        <a-entity position="0 1 0">
          <a-camera look-controls-enabled="false"
            custom-look-controls="enabled : true; speedRateForPhone : 0.3 ; reverseMouseDrag: false; reverseTouchDrag: false "
            wasd-controls="fly:  true" cursor="rayOrigin: mouse">
            <a-entity light="angle: 0; decay: 1.5; distance: 10; type: point"></a-entity>
          </a-camera>
        </a-entity>
      </a-scene>
    </div>
  );
}

export default App;
