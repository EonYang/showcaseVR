import React, { useState, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js';

const DetailPage = ({ data, myEmitter }) => {

    function showDetail(tru) {
        return {
            opacity: tru ? 1 : 0,
            pointerEvent: tru ? 'auto' : 'none'
        }
    }

    // useEffect(() => {
    //     document.querySelector('#scroll-body').scrollTop = 0;
    // },[])

    let [style, setStyle] = useState(showDetail(false));
    let [student, setStudent] = useState(data[0]);

    console.log(student);
    myEmitter.on('show-project', (id) => {
        console.log("heard, show-project")
        setStyle(showDetail(true))
        setStudent(data[id]);
        myEmitter.removeAllListeners('show-project');
    });

    // myEmitter.on('hide-project', (obj) => {
    //     console.log("heard, hide-project")
    //     setStyle(showDetail(false))
    // });

    let video1, video2;
    if (student.video_presentation_url) video1 = <ReactPlayer className="mw-100" url={student.video_presentation_url} controls />
    if (student.video_documentation_url) video2 = <ReactPlayer className="mw-100" url={student.video_documentation_url} controls />

    const hideProject = () => {
        setStyle(showDetail(false))
        // myEmitter.emit('hide-project');
    }

    return (
        <>
            <div id="detail-page"
                style={{ 'pointerEvents': style.pointerEvent, 'opacity': style.opacity }}
            >
                <div id="close-button" onClick={hideProject} style={{ zIndex: 99999 }}>
                    <AiOutlineCloseCircle size={44} />
                </div>


                <div id="scroll-view" className="w-100 h-100">
                    <div id="scroll-body"className="container-fluid px-4 py-4">
                        <h1>{student.title ? student.title : "No Title"}</h1>
                        <h3>{student.student_name}</h3>
                        <p>{student.abstract}</p>
                        <p>{student.thesis_statement}</p>
                        {video2}
                        <p>{student.context_research}</p>
                        {video1}
                    </div>

                </div>

            </div>
        </>
    )
}

export default DetailPage;