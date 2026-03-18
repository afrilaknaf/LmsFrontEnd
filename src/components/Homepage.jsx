import "../styles/Home.css"
import LightRays from './Linefloating';
import TextType from './Texttyping';
import aws from "../assets/Logos/aws-icon.png"
import LogoLoop from "../components/LogoLoop";
import Boot from "../assets/Logos/aws-icon.png"
import css from "../assets/Logos/css-icon.png"
import Docker from "../assets/Logos/docker-icon.png"
import express from "../assets/Logos/express-js-icon.png"
import flutter from "../assets/Logos/express-js-icon.png"
import github from "../assets/Logos/github-icon.png"
import html from "../assets/Logos/html-icon.png"
import java  from "../assets/Logos/java.png"
import js from "../assets/Logos/js.png"
import linux from "../assets/Logos/linux.png"
import mdb from "../assets/Logos/mdb.png"
import next from "../assets/Logos/next.png"
import node from "../assets/Logos/node.png"
import python from "../assets/Logos/python.png"
import react from "../assets/Logos/react.png"
import ruby from "../assets/Logos/ruby.png"
import tail from "../assets/Logos/tailwind.png"
import three from "../assets/Logos/three.png"
import ts from "../assets/Logos/ts.png"
import vue from "../assets/Logos/vue.png"
import BasicExample from "./cards";
import Content from "./Cotent";
import { useNavigate } from "react-router-dom";


export default function Home() {

    let navigate = useNavigate();


    const logos = [
        { src: html, alt: "react" },
        { src: css, alt: "node" },
        { src: Boot, alt: "mongo" },
        { src: tail, alt: "js" },
        { src: js, alt: "git" },
        { src: ts, alt: "git" },
        { src: react, alt: "git" },
        { src: node, alt: "git" },
        { src: express, alt: "git" },
        { src: next, alt: "git" },
        { src: mdb, alt: "git" },
        { src: aws, alt: "git" },
        { src: Docker, alt: "git" },
        { src: java, alt: "git" },
        { src: python, alt: "git" },
        { src: flutter, alt: "git" },
        { src: ruby, alt: "git" },
        { src: three, alt: "git" },
        { src: vue, alt: "git" },
        { src: linux, alt: "git" },
        { src: github, alt: "git" },
    ];

    return (
        <>
            

            <div id="overallcontent">
                <div id="ligth">
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#00ffff"
                        raysSpeed={1.5}
                        lightSpread={0.8}
                        rayLength={1.2}
                        followMouse={true}
                        mouseInfluence={0.1}
                        noiseAmount={0.1}
                        distortion={0.05}
                        className="custom-rays"
                    />
                </div>

                <div id="maincontent">
                    <h1><i class="ri-book-read-fill"></i>Modern & High ON-Demand Video Traning</h1>
                    <h2 style={{fontSize:"clamp(20px,4vw,60px)"}}>
                        <TextType
                            text={["Education Opens up the Mind", "Popular Courses", "Best Industry Leaders", "Professional Certification"]}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor={true}
                            cursorCharacter="|"
                        />
                    </h2>
                    <p>Build your future with our quality education. The best and largest all-in-one online tutoring platform in the world!</p>
                    <div id="buttonexploreandviewdemo">
                        <button onClick={()=> navigate("/course")}>EXPLORE COURSES</button>
                        <button>VIEW DEMO <i class="ri-play-fill"></i></button>
                    </div>
                </div>
            </div>
            <div className="techcontent">
                <div id="technologies">
                    <h1>Technologies You Will Learn</h1>
                    <LogoLoop id="loops"
                        logos={logos}
                        speed={140}
                        gap={40}
                        logoHeight={75}
                        pauseOnHover
                        scaleOnHover
                        fadeOut
                    />
                </div>
            </div>
            <BasicExample/>
            <Content/>
        </>
    )
}