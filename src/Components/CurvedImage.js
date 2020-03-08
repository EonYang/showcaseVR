import React, { useState, useEffect } from 'react';
import probe from "probe-image-size";

const CurvedImage = ({ student }) => {
    console.log(student);
    console.log(student.imageSrc);
    let id = `${student.i}${student.title.replace(/ /g, '')}`;
    let [size, setSize] = useState(student.size)
    let col = 18;

    let imageSrc = student.imageSrc;
    useEffect(() => {
        probe(student.imageSrc).then((res) => {
            console.log(res);
            setSize(res);
        })
    }, [])


    let radius = 7 + Math.random();
    let thetaLength = 340 / col + Math.random() * 2 / (size.height / size.width) - 6;
    let height = 0.1 * (size.height / size.width) * thetaLength;
    let scale = `${Math.random() / 5 + 0.9} ${Math.random() / 5 + 0.9} ${Math.random() / 5 + 0.9}`;
    let rot = `${20 * (Math.floor(student.i / col) - 2.5)} ${120 + student.i * (365 / col)} 0`;
    let pos = `0 ${-0.2 + 1 * Math.floor(student.i / col) + Math.random() * 1} 0`;

    return (
        <>
            <a-assets>
                <img crossOrigin="anonymous" id={id} src={imageSrc} alt={id} ></img>
            </a-assets>
            <a-curvedimage src={`#${id}`} radius={`${radius}`} theta-length={thetaLength} height={height}
                position={pos} rotation={rot} scale={scale} material="shader: standard">
                {/* <a-text value={student.student_name} rotation={`0 10 0`} position={`${radius}-1 0 0`}></a-text> */}

            </a-curvedimage>
        </>
    )

}


export default CurvedImage