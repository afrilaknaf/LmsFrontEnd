export default function CourseSkeleton() {
    return (
        <div className="carddetails">

            <div className="placeholder-glow">
                <span
                    className="placeholder col-12"
                    style={{ height: "180px", display: "block", borderRadius: "10px" }}
                ></span>
            </div>

            <div className="carddetails_body mt-2">

                <h5 className="placeholder-glow">
                    <span className="placeholder col-8"></span>
                </h5>

                <p className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                </p>

                <p className="placeholder-glow">
                    <span className="placeholder col-4"></span>
                </p>

            </div>

            <div className="placeholder-glow p-2">
                <span className="placeholder col-5"></span>
            </div>

        </div>
    )
}