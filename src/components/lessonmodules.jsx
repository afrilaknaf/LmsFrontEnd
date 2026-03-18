import { useEffect, useState } from "react"
import "../styles/lessonmodules.css"
import { useNavigate } from "react-router-dom"

export default function Modules(props) {

    let [lesson, setLesson] = useState([])
    let navigate = useNavigate()

    // ✅ FIXED dependency
    useEffect(() => {
        setLesson(props.value || [])
    }, [props.value])

    return (
        <>
            <div className="Overall_Modules">
                <h3>Modules</h3>

                {
                    lesson.map((item, index) => (
                        <ul key={index} className="Lesson_Content">
                            <button
                                disabled={!props.unlockedcourse}
                                onClick={() => {
                                    if (props.unlockedcourse) {
                                        navigate(`/lesson_video/${item._id}`)
                                    }
                                }}
                            >
                                <li>

                                    {item.title}

                                </li>
                            </button>
                            <input
                                type="checkbox"
                                disabled
                                checked={item.isCompleted || false}
                            />

                        </ul>
                    ))
                }

                {
                    props.unlockedcourse ? (
                        <div className="lesson_button">

                            <button onClick={() => navigate(-1)}>
                                <i className="ri-arrow-left-line"></i>
                                Go Back To Course
                            </button>

                            <button>
                                Enroll Course Now
                                <i className="ri-play-circle-line"></i>
                            </button>

                        </div>
                    ) : (
                        <div className="lesson_buttons">

                            <button
                                onClick={() => {
                                    if (lesson.length === 0) {
                                        alert("No modules available")
                                    } else {
                                        navigate(`/pay/${lesson[0].courseId}`)
                                    }
                                }}
                            >
                                <i className="ri-lock-unlock-line"></i>
                                Unlock The Course
                            </button>

                        </div>
                    )
                }

            </div>
        </>
    )
}