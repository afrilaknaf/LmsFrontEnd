import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/lesson.css";
import Modules from "./lessonmodules";
import { Gets } from "./getmethod";
import Cookies from "js-cookie";
import ProgressBar from "react-bootstrap/ProgressBar";
import Tabss from "./Tabs";

export default function Lessons() {
    let { courseid } = useParams();

    let [getCoursed, setGetCoursed] = useState([]);
    let [lesson, setLesson] = useState([]);
    let [progresss, setProgresss] = useState([]);
    let [isUnlocked, setIsUnlocked] = useState(false); // ✅ FIX

    let navigate = useNavigate();
    let studentid = Cookies.get("id");

    useEffect(() => {
        async function fetchData() {
            try {
                // ✅ Get course details
                let course = await Gets(`course/${courseid}`);
                setGetCoursed(course);

                // ✅ Get lessons
                let lessons = await Gets(`lessons/${courseid}`);
                setLesson(lessons);

                // ✅ Check if user purchased course
                if (studentid) {
                    let userCourses = await Gets(`users_course/${studentid}`);

                    let purchased = userCourses.some(
                        (c) => c.courseId === courseid
                    );

                    setIsUnlocked(purchased);
                }

                // ✅ Get progress
                if (studentid) {
                    const res = await axios.get(
                        `https://lmsbackend-oadz.onrender.com/course_progress/${studentid}/${courseid}`
                    );

                    setProgresss([res.data]);
                }
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [courseid, studentid]);

    return (
        <>
            <div className="overall_lesson">

                {/* LEFT SIDE */}
                <div id="frist_cor">
                    <h1 style={{
                        fontSize: "clamp(20px,4vw,30px)",
                        paddingLeft: "2.5rem",
                        marginTop: "90px",
                        marginBottom: "30px"
                    }}>
                        Course Description
                    </h1>

                    {/* COURSE DETAILS */}
                    {
                        getCoursed.map((item, index) => (
                            <div className="lesson_content" key={index}>
                                <p>
                                    Home <i className="ri-arrow-drop-right-line"></i>
                                    Course <i className="ri-arrow-drop-right-line"></i>
                                    {item.title}
                                </p>

                                <h1>{item.title}</h1>
                                <p>{item.description}</p>

                                <div id="smalllesson">
                                    <h3>
                                        <i className="ri-speak-line"></i>
                                        By <span>{item.TutorName}</span>
                                    </h3>

                                    <p>
                                        <i className="ri-earth-fill"></i>
                                        Language: <span>{item.language}</span>
                                    </p>

                                    <p>
                                        <i className="ri-calendar-fill"></i>
                                        Level: <span>{item.level}</span>
                                    </p>
                                </div>
                            </div>
                        ))
                    }

                    {/* MODULES */}
                    <div className="modles">
                        {isUnlocked ? (
                            <Modules value={lesson} unlockedcourse={true} />
                        ) : (
                            <div className="locked-ui">
                                <Modules value={lesson} unlockedcourse={false} />
                                <h3>🔒 Course Locked</h3>
                                <p>Purchase or unlock this course to view lessons.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div id="second_mod">

                    {/* PREVIEW VIDEO */}
                    <div id="preview">
                        {
                            getCoursed.map((item, index) => (
                                <video
                                    key={index}
                                    controls
                                    muted
                                    controlsList="nodownload"
                                    src={item.Preview_Video}
                                ></video>
                            ))
                        }

                        <h1>Preview Video</h1>
                    </div>

                    {/* PROGRESS BAR */}
                    <div id="progres_bar" style={{ marginBottom: "50px" }}>
                        <h1>Your Course Progress:</h1>

                        {
                            progresss.length > 0 ? (
                                progresss.map((item, index) => (
                                    <ProgressBar
                                        key={index}
                                        now={item.progresspercent}
                                        label={`${item.progresspercent}%`}
                                        animated
                                        variant="success"
                                    />
                                ))
                            ) : (
                                <p>No progress yet</p>
                            )
                        }
                    </div>

                </div>
            </div>

            <Tabss />
        </>
    );
}