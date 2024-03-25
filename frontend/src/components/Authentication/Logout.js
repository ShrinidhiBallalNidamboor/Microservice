import React, { useEffect, useState } from "react";
import '../../css/login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie'
import { useAuth } from "../AuthProvider";

const Logout = () => {


  const navigate = useNavigate();
  const {user, setUser, removeUser} = useAuth();

  useEffect(() => {
    console.log("Logging out");
    removeUser();
    // alert(user);
    
    // setTimeout(() => {
    //     console.log(user);
    //     alert(user);
    // }, 3000);
    navigate('/login');
  })

  return (
    <div>Logging out</div>
  )
}

export default Logout;