import React from "react";
import { Outlet, Link } from "react-router-dom";
import TextAnimation from "../Animations/TextAnimation";


const Navbarr = () => {
    return (
        <div className="border">
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand" href="#"><img src="https://play-lh.googleusercontent.com/K_jClVy1xNk4gSFa0qteJwYtbKIIKb8XI580h92KehKbixj05QB0-V53fkiJrFpwYQ" alt="" width={100} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/"} className="btn" aria-current="page" href="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/Summary"} className="btn" href="#">Generate Summary</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/AboutUs"} className="btn" href="#">About Us</Link>
                            </li>
                            <li>
                                <TextAnimation
                                    text={"Welcome to Automatic Text Summarization !"}
                                    textTag={"h3"}
                                    noHr = {""}
                                ></TextAnimation>
                            </li>

                            {/* <li className="nav-item">
                                <a className="btn" href="#" tabindex="-1" aria-disabled="true">
                                    <b>Text Summarization Using LSA with Transformers</b>
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}


export default Navbarr;
