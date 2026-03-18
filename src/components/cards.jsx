import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import "../styles/card.css"
import Cookies from "js-cookie"
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Gets } from './getmethod';
function BasicExample() {

    let [course_array, setCourse_array] = useState([])
    let [is_open, setIs_open] = useState(false)
    let [ispurchased, setIspurchased] = useState([])
    let navigate = useNavigate()
    let Course_get = async () => {
        let couarr = await Gets(`course_get`)
        setCourse_array(couarr)
        let userId = Cookies.get("id")
        let pur = await Gets(`users_course/${userId}`)
        setIspurchased(pur)
    }

    const ispurchasedarray = (courseId) => {
        return ispurchased.some(p => p.courseId === courseId)
    }


    useEffect(() => {
        Course_get()
    }, [])

    let Display_Course = course_array.length <= 3 ? course_array : course_array.slice(0, 3)

    return (
        <>
            <h1 style={{ textAlign: "center", fontSize: "clamp(23px,4vw,36px)", paddingBottom: 30 }}>Popular <span style={{ color: "teal" }}>Course</span></h1>
            <div className='courses'  >
                {
                    Display_Course.map((item, index) => (
                        <div className='carddetails' key={index}>
                            <img src={item.thumbnail} alt="Htmlimages" />
                            <div className='carddetails_body'>
                                <h1>{item.title}</h1>
                                {/* <p>{item.description}</p> */}
                                {/* <div className="hidden_hover"> */}
                                <div id="innerflex01">
                                    <p><span><i class="ri-timer-flash-line"></i>Duration:</span>{item.duration}</p>
                                    {/* <p>{item.is_locked}</p> */}
                                    <p><span>Langauge:</span>{item.language}</p>
                                </div>
                                <div id="innerflex02">
                                    <p><span>Level:</span>{item.level}</p>
                                    <p><span>Price:</span>{item.price}</p>
                                </div>
                            </div>
                            <div id="innerflex03">
                                <p><span>Lesson:</span>{item.total_lesson}</p>
                                {
                                    Cookies.get("id") ? <>
                                        {
                                            ispurchasedarray(item._id) ? <button onClick={() => navigate(`/lesson/${item._id}`, { state: { unlockedcourse: true } })}>Learn</button> : <button onClick={() => navigate(`/lesson/${item._id}`, { state: { unlockedcourse: false } })}>Unlock Learn</button>
                                        }
                                    </>
                                        :
                                        <>
                                            <button onClick={() => {
                                                toast.warn("Please Login to Learn Course")
                                            }}>Unlock</button>
                                        </>
                                }
                                {/* </div> */}
                            </div>
                            <div>

                            </div>
                        </div>
                    ))
                }
            </div>
            <div style={{ width: "100%", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
                <button id='coursecenter' onClick={() => navigate("/course")}>More Course<i class="ri-arrow-right-fill"></i></button>
            </div>
            <ToastContainer position='top-right' autoClose={2000} pauseOnHover theme='colored'></ToastContainer>
        </>
    );
}

export default BasicExample;