import Lottie from "lottie-react"
import loginsvg from "../assets/Appointment booking with smartphone.json"
import "../styles/login.css"
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import CryptoJS from "crypto-js"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
export default function Login() {

    let [form, setform] = useState({
        email: "",
        password: ""
    })
    let [ablebutton,setAblebutton]=useState(false)

    let handlelogin = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    let navigate = useNavigate()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    function datasubmitted(e) {
        e.preventDefault();
        setAblebutton(true)
        setTimeout(() => {
            setAblebutton(false)
        }, 3000);
        if (!emailRegex.test(form.email)) {
            toast.error("Invalid Email")
            return
        }
        if (!passwordRegex.test(form.password)) {
            toast.error("Invalid Password")
            return
        }
        let payload = { Email: form.email, Password: form.password }
        axios.post("https://lmsbackend-oadz.onrender.com/login", payload).then((res) => {
            if (res.data.msg === "Login SuccessFull") {
                toast.success(res.data.msg)
                setTimeout(() => {
                    navigate("/")
                }, 5000)
                Cookies.set("id",res.data.data._id ,{expires:1/24})
                let secertkey = import.meta.env.VITE_REACT_APP_SECRET_KEY;
                const encryptname = CryptoJS.AES.encrypt(res.data.data.Name, secertkey).toString();
                Cookies.set("StudentName", encryptname, { expires: 1/24 })
                const encrptemail = CryptoJS.AES.encrypt(res.data.data.Email, secertkey).toString();
                Cookies.set("StudentEmail", encrptemail, { expires: 1/24 })
                const encryptpass = CryptoJS.AES.encrypt(res.data.data.Password, secertkey).toString();
                Cookies.set("StudentPassword", encryptpass, { expires: 1/24 })
                Cookies.set("role",res.data.data.role,{expires:1/24})
            } if (res.data.msg === "Wrong Password") {
                toast.warning(res.data.msg)
            }
            if (res.data.msg === "User Doesnot Exists") {
                toast.error(res.data.msg)
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <>
            <div className="logincontent">
                <h1>Login</h1>
                <div id="logincombine">
                    <Lottie id="icon" animationData={loginsvg} loop={true} />
                    <div id="loginform">
                        <form onSubmit={datasubmitted}>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" onChange={handlelogin} value={form.email} placeholder="Enter the Email Here" />
                            <label htmlFor="pass">Password</label>
                            <input type="password" name="password" onChange={handlelogin} value={form.password} id="pass" placeholder="Enter the Password" />
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