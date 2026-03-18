import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import "../styles/navbar.css"
import { useEffect, useState } from "react";
import ToggleMenu from "./togglemenu";
import { Gets } from "./getmethod";
import { useLayoutEffect } from "react";

export default function Navbar() {

    let navigate = useNavigate();
    let [open, setOpen] = useState(false)
    let [isadmin, setIsadmin] = useState(false)

    let loginhidden = Cookies.get("StudentName")
    let user = Cookies.get("id")

    useEffect(() => {
        if (!user) return
        async function fecthRole() {
            let adminss = await Gets(`adminss/${user}`)
            if (adminss.role === "admin") setIsadmin(true)
        }
        fecthRole()
    }, [user])

    useLayoutEffect(() => {
        function handleSize() {
            if (window.innerWidth >= 900) {
                setOpen(false)
            }
        }
        handleSize()
    }, [])


    function logoutdetails() {
        Cookies.remove("StudentName")
        Cookies.remove("StudentEmail")
        Cookies.remove("StudentPassword")
        Cookies.remove("id")
        window.location.reload();
    }





    return (
        <>
            <div className="navbar">
                <h1><i class="ri-code-box-fill"></i>Edu<span id="bolder">ceet</span></h1>
                <ul id="list">
                    <li onClick={() => navigate("/")}>Home</li>
                    <li>About us</li>
                    <li>Contact Us</li>
                    <li onClick={() => navigate("/course")}>Course</li>
                    {isadmin ? <li onClick={()=> navigate("/dashboard")}>DashBoard</li> : <li style={{display:"none"}}>Hello</li>}
                </ul>
                <div id="buttonloginandsignup">
                    {
                        loginhidden ? <>
                            <button onClick={logoutdetails}>LOGOUT</button>
                        </> :
                            <>
                                <button onClick={() => navigate("/login")}>LOGIN</button>
                                <button onClick={() => navigate("/signup")}>SIGNUP</button>
                            </>
                    }
                </div>
                <button className="togglemenu" onClick={() => setOpen(!open)} style={{ border: "1px solid white", padding: "8px", borderRadius: "10px" }}><i class="ri-menu-line"></i></button>
                {
                    open && <ToggleMenu open={open} setOpen={setOpen} logoutdetails={logoutdetails} />
                }
            </div>
        </>
    )
}