import Mentor1 from "../assets/mentor1.jpg";
import Mentor2 from "../assets/mentor2.jpg";
import "../styles/Content.css"
export default function Content(){

    return(
        <>
        <div className="content1">
            <div id="content11">
                <img src={Mentor1} alt="" />
            </div>
            <div id="content12">
                <h1>Skills that suit you</h1>
                <p>Learn valuable, practical skills from free online video courses. Explore tech essentials and keep pace with change. Become more focused and productive. Top it off with courses that round out your skills and enrich your day to day.</p>
                <button>Get Stared</button>
                <button>Course</button>
            </div>
        </div>

        <div className="content1">
            <div id="content12">
                <h2>Educeet <i class="ri-terminal-box-line"></i></h2>
                <h1>Build the skills of the future, today</h1>
                <p>Learn valuable, practical skills from free online video courses. Explore tech essentials and keep pace with change. Become more focused and productive. Top it off with courses that round out your skills and enrich your day to day.</p>
                <button>Join Now Today</button>
            </div>
            <div id="content11" style={{marginBottom:"200px"}}>
                <img src={Mentor2} alt="" />
            </div>
        </div>
        </>
    )
}