import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import CourseSkeleton from "./SeleteonLoader"

export default function Course() {

    let [course_array, setCourse_array] = useState([])
    let [ispurchased, setIspurchased] = useState([])
    let [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    let Course_get = async () => {
        try {
            setLoading(true)

            const courseRes = await axios.get("https://lmsbackend-oadz.onrender.com/course_get")
            setCourse_array(courseRes.data.data)

            let userId = Cookies.get("id")
            const userRes = await axios.get(`https://lmsbackend-oadz.onrender.com/users_course/${userId}`)
            setIspurchased(userRes.data.data)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        Course_get()
    }, [])

    const ispurchasedarray = (courseId) => {
        return ispurchased.some(p => p.courseId === courseId)
    }

    return (
        <>
            <h1 style={{ marginTop: "100px", textAlign: "center" }}>
                Hello Course
            </h1>

            <div className='coursess'>

                {
                    loading ? (
                        // 🔥 Skeleton Loader
                        Array(6).fill(0).map((_, index) => (
                            <CourseSkeleton key={index} />
                        ))
                    ) : (
                        // ✅ Real Data
                        course_array.map((item, index) => (
                            <div className='carddetails' key={index}>

                                <img src={item.thumbnail} loading="lazy" alt="course" />

                                <div className='carddetails_body'>
                                    <h1>{item.title}</h1>

                                    <div id="innerflex01">
                                        <p>
                                            <span>
                                                <i className="ri-timer-flash-line"></i> Duration:
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
                                            ispurchasedarray(item._id)
                                                ? (
                                                    <button onClick={() =>
                                                        navigate(`/lesson/${item._id}`, { state: { unlockedcourse: true } })
                                                    }>
                                                        Learn
                                                    </button>
                                                )
                                                : (
                                                    <button onClick={() =>
                                                        navigate(`/lesson/${item._id}`, { state: { unlockedcourse: false } })
                                                    }>
                                                        Unlock Learn
                                                    </button>
                                                )
                                        ) : (
                                            <button onClick={() =>
                                                toast.warn("Please Login to Learn Course")
                                            }>
                                                <i className="ri-lock-fill"></i> Unlock
                                            </button>
                                        )
                                    }

                                </div>

                            </div>
                        ))
                    )
                }

            </div>

            <ToastContainer
                position='top-right'
                autoClose={2000}
                pauseOnHover
                theme='colored'
            />
        </>
    )
}