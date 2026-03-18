import gifform from "../assets/Login.json"
import Lottie from "lottie-react";
import "../styles/Signup.css"
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import axios from "axios"
import { useNavigate } from "react-router-dom"

// const secretKey = process.env.REACT_APP_SECRET_KEY;

export default function Signup() {

    let [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confrimpassword: ""
    })
    let [ablebutton, setAblebutton] = useState(false)

    let navigate = useNavigate()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



    let handledata = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function alldata(e) {
        e.preventDefault();
        setAblebutton(true)
        setTimeout(() => {
            setAblebutton(false)
        }, 4000)
        if (form.name.length < 3) {
            toast.error("Invalid Name")
            return
        }
        if (!emailRegex.test(form.email)) {
            toast.error("Wrong Email")
            return
        }
        if (!passwordRegex.test(form.password)) {
            toast.error("Wrong Password")
            return
        }
        if (form.confrimpassword !== form.password) {
            toast.error("PassWord Mismacth")
            return
        }



        let payload = { Name: form.name, Email: form.email, Password: form.password }



        await axios.post("http://localhost:2005/signup", payload).then((res) => {
            console.log(res.data.data)
            toast.success(res.data.msg)
            setTimeout(() => {
                navigate("/login")
            }, 7000)

        }).catch((err) => {
            console.log(err)
        })
    }



    return (
        <>
            <div className="allcontent">
                <h1>Signup</h1>
                <div className="formcontent">

                    <div id="halfwhite" >
                        <Lottie animationData={gifform} loop={true} />
                    </div>

                    <div id="forminput">
                        <form onSubmit={alldata}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={form.name} onChange={handledata} placeholder="Enter the Name" />
                            <br />
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={form.email} onChange={handledata} placeholder="Enter the email" />
                            <br />
                            <label htmlFor="pass">Password</label>
                            <input type="password" id="pass" name="password" value={form.password} onChange={handledata} placeholder="Enter the Password" />
                            <br />
                            <label htmlFor="conpass">Confrim Password</label>
                            <input type="password" name="confrimpassword" id="conpass" value={form.confrimpassword} onChange={handledata} placeholder="Enter Confrim Password" /> <br />
                            <button type="submit" disabled={ablebutton}>{ablebutton ? "Please Wait ..." : "Submit"}</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                pauseOnHover
                theme="colored"
            />
        </>
    )
}