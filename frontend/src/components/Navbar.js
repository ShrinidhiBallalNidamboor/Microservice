import React from "react";
import { Link } from "react-router-dom";
import '../css/navbar.css';
import { useAuth } from "./AuthProvider";

const Navbar = ({ active }) => {
    const {user} = useAuth();
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Eazy Project Mangement</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class=" collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav mr-auto">
                        {/* <a class={"nav-link " + (active === "your-works" ? "active": "")} href="/your-works">Your works</a> */}
                        <a class={"nav-link " + (active === "projects" ? "active": "")} href="/projects">Projects</a>
                        {/* <a class={"nav-link " + (active === "profile" ? "active": "")} href="/profile">Profile</a> */}
                        <a class={"nav-link " + (active === "qna" ? "active": "")} href="/Trail">Q&A</a>
                        <a class={"nav-link " + (active === "logout" ? "active": "")} href="/logout">Logout</a>
                        
                    </div>                        
                    <h6 className="nav-link ms-auto text-white">{user.userId} | {user.orgName}</h6>

                </div>
            </div>
        </nav>
    );

}

export default Navbar;