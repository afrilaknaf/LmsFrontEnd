import axios from 'axios';
import { useEffect, useState } from 'react';
import "../styles/card.css";
import Cookies from "js-cookie";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Gets } from './getmethod';
import CourseSkeleton from "./SeleteonLoader"; // keep same name if file same

function BasicExample() {

    let [course_array, setCourse_array] = useState([]);
    let [ispurchased, setIspurchased] = useState([]);
    let [loading, setLoading] = useState(true); // ✅ loader state

    let navigate = useNavigate();

    let Course_get = async () => {
        try {
            setLoading(true);

            let userId = Cookies.get("id");

            const [couarr, pur] = await Promise.all([
                Gets(`course_get`),
                userId ? Gets(`users_course/${userId}`) : Promise.resolve([])
            ]);

            setCourse_array(couarr);
            setIspurchased(pur);

            // 🔥 optional smooth loader
            await new Promise(res => setTimeout(res, 500));

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        Course_get();
    }, []);

    const ispurchasedarray = (courseId) => {
        return ispurchased.some(p => p.courseId === courseId);
    };

    let Display_Course =
        course_array.length <= 3 ? course_array : course_array.slice(0, 3);

    return (
        <>
            <h1 style={{
                textAlign: "center",
                fontSize: "clamp(23px,4vw,36px)",
                paddingBottom: 30
            }}>
                Popular <span style={{ color: "teal" }}>Course</span>
            </h1>

            <div className='courses'>

                {
                    loading ? (
                        // 🔥 Skeleton Loader
                        Array(3).fill(0).map((_, index) => (
                            <CourseSkeleton key={index} />
                        ))
                    ) : (
                        // ✅ Real Data
                        Display_Course.map((item, index) => (
                            <div className='carddetails' key={index}>

                                <img src={item.thumbnail} alt="course" />

                                <div className='carddetails_body'>
                                    <h1>{item.title}</h1>

                                    <div id="innerflex01">
                                        <p>
                                            <span>
                                                <i className="ri-timer-flash-line"></i>Duration:
                                            </span>
                                            {item.duration}
                                        </p>

                                        <p>
                                            <span>Language:</span>
                                            {item.language}
                                        </p>
                                    </div>

                                    <div id="innerflex02">
                                        <p><span>Level:</span>{item.level}</p>
                                        <p><span>Price:</span>{item.price}</p>
                                    </div>
                                </div>

                                <div id="innerflex03">
                                    <p><span>Lesson:</span>{item.total_lesson}</p>

                                    {
                                        Cookies.get("id") ? (
                                            ispurchasedarray(item._id) ? (
                                                <button onClick={() =>
                                                    navigate(`/lesson/${item._id}`)
                                                }>
                                                    Learn
                                                </button>
                                            ) : (
                                                <button onClick={() =>
                                                    navigate(`/lesson/${item._id}`)
                                                }>
                                                    Unlock Learn
                                                </button>
                                            )
                                        ) : (
                                            <button onClick={() =>
                                                toast.warn("Please Login to Learn Course")
                                            }>
                                                Unlock
                                            </button>
                                        )
                                    }
                                </div>

                            </div>
                        ))
                    )
                }

            </div>

            <div style={{
                width: "100%",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px"
            }}>
                <button id='coursecenter' onClick={() => navigate("/course")}>
                    More Course <i className="ri-arrow-right-fill"></i>
                </button>
            </div>

            <ToastContainer
                position='top-right'
                autoClose={2000}
                pauseOnHover
                theme='colored'
            />
        </>
    );
}

export default BasicExample;