import React, { useState, useEffect } from 'react';
import probe from "probe-image-size";
import base64Img from 'base64-img';

// import $ from 'jquery';

const CurvedImage = ({ student }) => {
    let imagePath = "./compressed/"
    // console.log(student);
    // console.log(student.imageSrc);
    let id = `id${student.i}${student.student_slug.replace(/([^A-Za-z])/g, '')}`;
    // let [size, setSize] = useState(student.size)
    let size = student.size;
    let col = 18;
    let posY = -0.2 + 1 * Math.floor(student.i / col) + Math.random() * 0.2;

    let imageSrc = imagePath + student.thumbnailName;
    // console.log(imageSrc);

    // useEffect(() => {
    //     probe(student.imageSrc).then((res) => {
    //         console.log(res);npm install --save aframe-extras
    //         setSize(res);
    //     })
    // }, [])


    let radius = 7 + Math.random() * 0.5;
    let thetaLength = 340 / col + Math.random() * 2 * (size.width / size.height) - 6;
    let height = 0.11 * (size.height / size.width) * thetaLength;
    // let scale = `${Math.random() / 5 + 0.9} ${Math.random() / 5 + 0.9} ${Math.random() / 5 + 0.9}`;
    let rot = `${20 * (Math.floor(student.i / col) - 2.5)} ${(120 + student.i * (365 / col))%360} 0`;
    let pos = `0 ${posY} 0`;

    return (
        <> <a-entity rotation="0 180 0" position="0 2 0"
            animation={`property: position; to: ${pos}; dur: 3000; delay: ${student.i*30} easing: easeInOutSine`} 
            animation={`property: rotation; to: ${rot}; dur: 3000; delay: ${student.i*30} easing: easeInOutSine`}>
            <a-curvedimage id={id} radius={`${radius}`} theta-length={thetaLength} theta-start={-thetaLength / 2} height={height} material={`shader: standard; src:url(${imageSrc})`}
                animation__mouseenter={`property: position; to:0 0 -0.5; dur:300; startEvents:mouseenter `}
                animation__mouseleave={`property: position; to:0 0 0;  dur:200; startEvents:mouseleave`}
                animation__enter={`property: scale; to:1.2 1.2 1; dur:300; startEvents:mouseenter `}
                animation__leave={`property: scale; to:1 1 1;  dur:200; startEvents:mouseleave`}
                show-detail={`event: click; studentid: ${student.i}`}
                proxy-event__enter={`event: mouseenter; to: #${id}text`}
                proxy-event__leave={`event: mouseleave; to: #${id}text`}>
                <a-entity rotation={`0 180 0`} position={`0 ${- 0.6 * height} ${radius - 0.2}`}  >
                    <a-text value='' anchor="align" align="center" id={`${id}text`} opacity="0"
                        animation__mouseenter={`property: opacity; to:1; dur:300; startEvents:mouseenter`}
                        animation__mouseleave={`property: opacity; to:0;  dur:200; startEvents:mouseleave`}
                        changeText__enter={`event : mouseenter; value : ${student.title}`}
                        changeText__leave={`event : mouseleave; value : `}
                    ></a-text>
                </a-entity>
            </a-curvedimage>
        </a-entity>
        </>
    )

}


export default CurvedImage