import React from "react";
import { Link } from "react-router-dom";
import '../css/navbar.css';

const Navbar = ({ active }) => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Eazy Project Mangement</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class={"nav-link " + (active === "your-works" ? "active": "")} href="/your-works">Your works</a>
                        <a class={"nav-link " + (active === "projects" ? "active": "")} href="/projects">Projects</a>
                        <a class={"nav-link " + (active === "profile" ? "active": "")} href="/profile">Profile</a>
                        <a class={"nav-link " + (active === "Qna" ? "active": "")} href="/Qna">QNA</a>
                    </div>
                </div>
            </div>
        </nav>
    );

}

export default Navbar;