import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
export default function Course() {

    let [course_array, setCourse_array] = useState([])
    let [ispurchased, setIspurchased] = useState([])
    let navigate = useNavigate()
    let [is_open, setIs_open] = useState(false)

    let Course_get = async () => {
        await axios.get("https://lmsbackend-oadz.onrender.com/course_get").then((res) => {
            // console.log(res.data.data)
            setCourse_array(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
        let userId = Cookies.get("id")
        await axios.get(`https://lmsbackend-oadz.onrender.com/users_course/${userId}`).then((res) => {
            // console.log(res.data.data)
            setIspurchased(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }


    useEffect(() => {
        Course_get()
    }, [])

    const ispurchasedarray = (courseId) => {
        return ispurchased.some(p => p.courseId === courseId)
    }

    return (
        <>
            <h1 style={{ marginTop: "100px", textAlign: "center", marginBottom: "0px" }}>Hello Course { }</h1>
            <div >
                <div className='coursess'  >
                    {
                        course_array.map((item, index) => (
                            <div className='carddetails' key={index}>
                                <img src={item.thumbnail} loading="lazy" alt="Htmlimages" />
                                <div className='carddetails_body'>
                                    <h1>{item.title}</h1>
                                    {/* <p>{item.description}</p> */}
                                    {/* <div className="hidden_hover"> */}
                                    <div id="innerflex01">
                                        <p><span><i class="ri-timer-flash-line"></i>Duration:</span>{item.duration}</p>
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
                                                ispurchasedarray(item._id)
                                                    ? <button onClick={() =>
                                                        navigate(`/lesson/${item._id}`, { state: { unlockedcourse: true } })
                                                    }>
                                                        Learn
                                                    </button>
                                                    : <button onClick={() =>
                                                        navigate(`/lesson/${item._id}`, { state: { unlockedcourse: false } })
                                                    }>
                                                        Unlock Learn
                                                    </button>
                                            }
                                        </>
                                            :
                                            <>
                                                <button onClick={() => {
                                                    toast.warn("Please Login to Learn Course")
                                                }}><i class="ri-lock-fill"></i>Unlock</button>
                                            </>
                                    }


                                    {/* </div> */}
                                </div>
                                <div>
                                    {/* <Modal isOpen={is_open} onRequestClose={() => setIs_open(false)} style={{
                                            content: {
                                                borderRadius: "16px",
                                                maxWidth: "500px",
                                                margin: "auto",
                                                maxHeight: "400px",
                                                transition: "all 0.7s",
                                                display: "flex",
                                                justifyContent: "start",
                                                alignItems: "center",
                                                flexDirection: "column",
                                                backgroundColor:"black",
                                                color:"white"
                                            }
                                        }}>
                                            <h2>{item.title}</h2>
                                            <p>{item.description}</p>
                                        </Modal> */}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <ToastContainer position='top-right' autoClose={2000} pauseOnHover theme='colored'></ToastContainer>

        </>
    )
}