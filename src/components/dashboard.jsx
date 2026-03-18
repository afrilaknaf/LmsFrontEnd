import { Outlet, useNavigate } from "react-router-dom"

export default function Dashboard() {

    const navigate = useNavigate()

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>

            {/* Sidebar */}
            <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
                <h3 className="text-center mb-4">Admin</h3>

                <ul className="nav flex-column">

                    <li className="nav-item mb-2">
                        <button 
                            className="btn btn-dark w-100 text-start"
                            onClick={() => navigate("/addcourse")}
                        >
                            📘 Add Course
                        </button>
                    </li>

                    <li className="nav-item mb-2">
                        <button 
                            className="btn btn-dark w-100 text-start"
                            onClick={() => navigate("/addcourse")}
                        >
                            📂 Add Module
                        </button>
                    </li>

                    <li className="nav-item mb-2">
                        <button 
                            className="btn btn-dark w-100 text-start"
                            onClick={() => navigate("/addcourse")}
                        >
                            🎥 Add Lesson
                        </button>
                    </li>

                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1">

                {/* Header */}
                <div className="bg-light p-3 shadow-sm d-flex justify-content-between">
                    <h4>Admin Dashboard</h4>

                    <button 
                        className="btn btn-danger"
                        onClick={() => navigate("/")}
                    >
                        Logout
                    </button>
                </div>

                {/* Page Content */}
                <div className="p-4">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}