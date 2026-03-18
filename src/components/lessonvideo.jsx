import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../styles/videolesson.css"
import { useRef } from "react"
import { Gets } from "./getmethod"
import Cookies from "js-cookie"

export default function LessonVideo() {

    const { lessonid } = useParams()
    const [videos, setVideos] = useState([])
    const [completed, setCompleted] = useState(false)
    const videoref = useRef(null)
    const maxwacthedtime = useRef(0)
    let Navigate = useNavigate()


    useEffect(() => {
        async function ger() {
            let data = await Gets(`video/${lessonid}`)
            setVideos(data)
            // console.log(data)
        }
        ger()
    }, [lessonid])






    function handlecompleted() {
        setCompleted(true)
    }

    function handletimeupdated() {
        const videos = videoref.current
        if (!videos) return
        if (videos.currentTime > maxwacthedtime.current) {
            maxwacthedtime.current = videos.currentTime
        }
    }

    function handletimeskip() {
        const videos = videoref.current
        if (!videos) return
        if (videos.currentTime > maxwacthedtime.current + 0.5) {
            videos.currentTime = maxwacthedtime.current
        }
    }

    function postcompleted() {
        let userIds = Cookies.get("id")
        videos.map((item) => {
            let payload = { userId: userIds, courseId: item.courseId, lessonId: item._id, isCompleted: true }
            axios.post("http://localhost:2005/Course_progress", payload).then((res) => {
                // console.log(res.data.data)
                axios.put(`http://localhost:2005/lessonmodules/${item._id}`,{isCompleted:true}).then((res)=>{
                    // console.log(res.data.data)
                }).catch((err)=>{
                    console.log(err)
                })
                Navigate(`/lesson/${item.courseId}`)

            }).catch((err) => {
                console.log(err)
            })
        })
    }



    return (
        <>
            <h1 style={{ marginTop: "100px",color:"teal",textAlign:"center" }}>Lesson Video</h1>
            {videos[0] && (
                <video
                    ref={videoref}
                    src={videos[0].contentUrl}
                    controls
                    muted
                    style={{ width: "100%", height: "600px" }}
                    onTimeUpdate={handletimeupdated}
                    onSeeking={handletimeskip}
                    onSeeked={handletimeskip}
                    onEnded={handlecompleted}
                    controlsList="nodownload noplaybackrate"
                    disablePictureInPicture
                    className="object-fit-cover"
                />
            )}

            <button
                    id="next-button"
                    disabled={!completed}
                    style={{
                        backgroundColor: completed ? "green" : "gray",
                        cursor: completed ? "pointer" : "not-allowed",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        margin:"20px auto"
                    }}
                    onClick={postcompleted}
                >
                    Next Lesson
                </button>

        </>
    )
}