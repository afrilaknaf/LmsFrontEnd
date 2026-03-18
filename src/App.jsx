import './App.css'
import Home from './components/Homepage'
import {Routes,Route} from "react-router-dom"
import Signup from './components/Signup'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { SlideRoutes } from "react-slide-routes";
import Modal from "react-modal";
import Lessons from './components/Lessons'
import Navbar from './components/navbar'
import LessonVideo from './components/lessonvideo'
import Course from './components/Course'
import 'bootstrap/dist/css/bootstrap.min.css';
import Payment from './components/payment'
import Dashboard from './components/dashboard'
import AddCourse from './components/addcourse'
Modal.setAppElement("#root"); // for accessibility

function App() {



  return (
    <>
    <Navbar/>
    <Routes>
        <Route path='/' index element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/lesson/:courseid' element={<Lessons/>}/>
        <Route path='/lesson_video/:lessonid' element={<LessonVideo/>}/>
        <Route path='/course' element={<Course/>}/>
        <Route path="/pay/:courseid" element={<Payment/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/addcourse" element={<AddCourse/>}/>
      </Routes>
    </>
  )
}

export default App
