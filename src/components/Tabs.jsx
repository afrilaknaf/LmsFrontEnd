import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "../styles/Tabs.css"

function Tabss() {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3" 
        >
            <Tab eventKey="home" style={{fontSize:"clamp(12px,4vw,25px)"}} title="What you Learn">
                <div className='youlearn'>
                    <section>
                        <h2>What I Learned</h2>
                        <p>
                            Through these topics, I learned how modern web applications are built using a
                            combination of <strong>HTML, CSS, JavaScript, React, and Node.js</strong>.
                            I understood how basic HTML provides the structure of a webpage, while CSS is
                            responsible for styling, layout, animations, and visual effects such as circular
                            progress bars. Using <strong>SVG with CSS</strong> helped me learn how scalable
                            graphics can be animated smoothly and used for advanced UI designs. JavaScript
                            played an important role in adding interactivity, updating progress values
                            dynamically, and controlling animations based on time or user actions.
                            Converting plain HTML, CSS, and JavaScript code into reusable
                            <strong>React JSX components</strong> taught me the importance of component-based
                            architecture and state management. I also learned how <strong>npm</strong> helps
                            manage packages and dependencies efficiently in a project, making development
                            faster and more organized. Overall, these topics improved my understanding of
                            both frontend and backend integration and helped me think like a
                            <strong>full-stack developer</strong>.
                        </p>
                    </section>

                    <section>
                        <h2>Key Points Learned</h2>
                        <ul>
                            <li>Structure web pages using <strong>HTML</strong></li>
                            <li>Style and animate UI using <strong>CSS</strong></li>
                            <li>Create circular progress using <strong>SVG</strong></li>
                            <li>Add dynamic behavior with <strong>JavaScript</strong></li>
                            <li>Convert code into reusable <strong>React JSX components</strong></li>
                            <li>Manage packages using <strong>npm</strong></li>
                            <li>Understand basic <strong>Node.js project setup</strong></li>
                            <li>Debug common issues like <strong>CSS not loading</strong></li>
                        </ul>
                    </section>
                </div>
            </Tab>
            <Tab eventKey="profile" title="Description">
                <div className='description'>
                <div id="introduction">
                    <p>
                        At the end of this short course, you will have programmed your first game.
                        You will learn gameplay development fundamentals by actually doing it –
                        writing and running real code on your own machine.
                    </p>

                    <p>
                        Each step of the course includes the source code exactly as it should look
                        at that stage. You can view and download the resources to compare your work
                        or continue from any step, so you never get stuck.
                    </p>
                </div>
                <div id="learning-approach">
                    <h2>Begin Your Game Programming Journey the Proven Way</h2>

                    <p>
                        Many beginner developers are advised to start small by creating simple games.
                        This course follows that proven method by guiding you through a classic
                        ball-and-paddle style game inspired by games from the 1970s.
                    </p>
                </div>
                <div id="benefits">
                    <h2>By Following This Approach, You Will:</h2>

                    <ul>
                        <li>Learn game design from a fun and familiar classic</li>
                        <li>Start practicing immediately without waiting for an idea</li>
                        <li>Finish a complete game in hours or a weekend</li>
                        <li>Understand every line of code in the project</li>
                        <li>Avoid distraction from complex artwork</li>
                        <li>Master core game development fundamentals</li>
                    </ul>
                </div>
                <div id="tools">
                    <p>
                        You can program this game using a normal text editor and run it directly
                        in your web browser. No special software is required.
                    </p>
                    <p>
                        Although this course uses JavaScript with HTML5 Canvas, the focus is on
                        common game programming concepts. These skills can later be applied to
                        other languages such as C#, Java, C++, Python, or ActionScript.
                    </p>
                    <p>
                        As a private game development trainer, this material is used to help
                        beginners start quickly and build confidence. Within hours, you will
                        complete your first project and gain momentum for more advanced learning.
                    </p>
                </div>

                </div>
            </Tab>
            <Tab eventKey="contact" title="Perfect For">
                <div id="Perfect">
                    <h2>Who this course is for:</h2>
                    <ul>
                        <li>This is for anyone who wants a quick but thorough introduction to simple game programming in a way that doesn't require any special software, download, or installation</li>
                        <li>If you've had at least a little exposure to generic programming concepts like variables, functions, and if-statements you'll have an advantage, however in case you've never heard those terms they're explained briefly as they come up</li>
                        <li>Although this a uses JavaScript and HTML5, it is not intended for someone who is focused on learning HTML5/JS for web page design</li>
                    </ul>
                </div>
            </Tab>
        </Tabs>
    );
}

export default Tabss;