import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import "../styles/lesson.css"
import Modules from "./lessonmodules";
import { Gets } from "./getmethod";
import Cookies from "js-cookie"
import ProgressBar from 'react-bootstrap/ProgressBar';
import Tabss from "./Tabs";




export default function Lessons() {

    let { courseid } = useParams();
    let [getCoursed, setGetCoursed] = useState([])
    let [lesson, setLesson] = useState([])
    let navigate = useNavigate()
    let studentid = Cookies.get("id")
    let [progresss, setProgresss] = useState([])
    let location = useLocation();
    let unlockedcourse = location.state?.unlockedcourse ?? false;

    useEffect(() => {
        async function fecthd() {
            let course = await Gets(`course/${courseid}`)
            setGetCoursed(course)
            let lesson = await Gets(`lessons/${courseid}`)
            setLesson(lesson)
            axios.get(`https://lmsbackend-oadz.onrender.com/course_progress/${studentid}/${courseid}`).then((res) => {
                // console.log(res.data)
                let ar = []
                ar.push(res.data)
                // console.log(ar)
                setProgresss(ar)
            }).catch((err) => {
                console.log(err)
            })
        }
        fecthd()
    }, [courseid])

    useEffect(() => {
        async function users() {
            let user = await Gets(`users_course/${studentid}`)
            console.log(user)
        }
        users()
    }, [])



    return (
        <>

            <div className="overall_lesson">
                <div id="frist_cor">
                    <h1 style={{ fontSize: "clamp(20px,4vw,30px)", paddingLeft: "2.5rem", marginTop: "90px", marginBottom: "30px" }}>Course Description</h1>
                    {
                        getCoursed.map((item, index) =>
                            <div className="lesson_content" key={index}>
                                <p style={{ fontSize: "clamp(14px,4vw,17px)" }}>Home<i class="ri-arrow-drop-right-line"></i>Course<i class="ri-arrow-drop-right-line"></i>{item.title}</p>
                                <h1 style={{ fontSize: "clamp(14px,4vw,17px)" }}>{item.title}</h1>
                                <p style={{ fontSize: "clamp(14px,4vw,17px)" }}>{item.description}</p>
                                <div id="smalllesson">
                                    <h3><i class="ri-speak-line" ></i>By <span> {item.TutorName}</span></h3>
                                    <p><i class="ri-earth-fill"></i>Langauage: <span>{item.language}</span></p>
                                    <p><i class="ri-calendar-fill"></i>Level: <span>{item.level}</span></p>
                                </div>
                            </div>
                        )
                    }
                    <div className="modles">
                        {
                            unlockedcourse ? (
                                <Modules value={lesson} unlockedcourse={true} />
                            ) : (
                                <div className="locked-ui">
                                <Modules value={lesson} unlockedcourse={false} />
                                    <h3>🔒 Course Locked</h3>
                                    <p>Purchase or unlock this course to view lessons.</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div id="second_mod">
                    <div id="preview">
                        {
                            getCoursed.map((item, index) => (
                                <video controlsList="nodownload" src={item.Preview_Video} controls muted key={index}></video>
                            ))
                        }
                        <h1 style={{ fontSize: "clamp(17px,4vw,25px)" }}>Preview Video</h1>
                    </div>
                    <div id="progres_bar" style={{marginBottom:"50px"}}>
                        <h1>Your Course Progress Bar:</h1>
                        {
                            progresss.map((item, index) => (
                                <ProgressBar label={`${item.progresspercent}%`} animated variant="success" key={index} now={item.progresspercent
                                }></ProgressBar>
                            ))
                        }
                    </div>
                </div>
            </div>

            <Tabss />
        </>
    )
}