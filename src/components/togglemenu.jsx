import "../styles/navbar.css"
import Cookies from "js-cookie"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function ToggleMenu({open,setOpen,logoutdetails}) {

    let loginhidden = Cookies.get("StudentName")
    let navigate = useNavigate()

    return(
        <>
        {
            close && <div className="sidecontent">
            <ul id="listss">
                    <li onClick={()=>{
                        navigate("/")
                        setOpen(false)
                    }}><span><i class="ri-home-4-line"></i></span> Home</li>
                    <li onClick={()=> setOpen(false)}><span><i class="ri-chat-2-line"></i></span>About us</li>
                    <li onClick={()=> setOpen(false)}><span><i class="ri-phone-line"></i></span>Contact Us</li>
                    <li onClick={()=>{ navigate("/course");setOpen(false)}}><span><i class="ri-install-fill"></i></span>Course</li>
                </ul>
                <div id="buttonloginandsignupss">
                    {
                        loginhidden ? <>
                            <button onClick={()=>{
                                logoutdetails()
                                setOpen(false)
                            }}>LOGOUT</button>
                        </> :
                            <>
                                <button onClick={() =>{
                                    navigate("/login")
                                    setOpen(false)
                                }}>LOGIN</button>
                                <button onClick={() =>{
                                    navigate("/signup")
                                    setOpen(false)
                                }}>SIGNUP</button>
                            </>
                    }
                </div>
        </div>
        }
        
        </>
    )
}