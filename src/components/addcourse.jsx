import { useEffect, useState } from "react"
import { Gets } from "./getmethod"
import { ToastContainer, toast } from "react-toastify"

export default function AddCourse() {

    let [title, setTitle] = useState("")
    let [description, setDescription] = useState("")
    let [thumbnail, setThumbnail] = useState("")
    let [duration, setDuration] = useState("")
    let [level, setLevel] = useState("")
    let [language, setLanguage] = useState("")
    let [total_lesson, setTotal_lesson] = useState("")
    let [price, setPrice] = useState(0)
    let [is_locked, setIs_locked] = useState(true)

    useEffect(() => {
        async function lets() {
            let ss = await Gets(`course_get`)
            console.log(ss)
        }
        lets()
    }, [])

    function postCourse(e) {
        e.preventDefault()

        if (title.length < 5) {
            toast.warn("Please fill the title content")
            return
        }
        if (description.length < 15) {
            toast.warn("Please Fill the Description Content")
            return
        }

        toast.success("Course Added Successfully 🚀")
    }

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Add Course</h2>

                <form onSubmit={postCourse}>

                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input className="form-control" type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Thumbnail URL</label>
                        <input className="form-control" type="text"
                            value={thumbnail}
                            onChange={(e) => setThumbnail(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Duration</label>
                            <input className="form-control" type="text"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Level</label>
                            <input className="form-control" type="text"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Language</label>
                            <input className="form-control" type="text"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Total Lessons</label>
                            <input className="form-control" type="text"
                                value={total_lesson}
                                onChange={(e) => setTotal_lesson(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Price</label>
                            <input className="form-control" type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Locked</label>
                            <select className="form-control"
                                value={is_locked}
                                onChange={(e) => setIs_locked(e.target.value === "true")}
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>

                    <button className="btn btn-primary w-100">
                        Add Course
                    </button>

                </form>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}