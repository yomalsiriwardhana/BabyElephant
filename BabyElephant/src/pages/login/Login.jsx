import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("localStorage");

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [toggleEye, setToggleEye] = useState(false);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();

  const handleToggle = () => {
    setToggleEye(!toggleEye);
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Hardcoded login check
      if (inputs.email === "a" && inputs.password === "123") {
        localStorage.setItem('email', inputs.email);
        localStorage.setItem('isLogged', 'true');
        ReactSession.set("isLogged", true);
        window.alert('Login Successful');
        navigate("/levels");
        return;
      }

      // Firebase login check as fallback
      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      localStorage.setItem('email', inputs.email);
      localStorage.setItem('isLogged', 'true');
      ReactSession.set("isLogged", true);
      window.alert('Login Successful');
      const user = userCredential.user;
      console.log(user);
      navigate("/levels");
    } catch (error) {
      console.error('Error:', error.message);
      window.alert('Email or password is wrong');
    }
  };

  return (
    <div className="login">
      
      <form>
        <h2>Login</h2>
        <div className="formInput">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="formInput">
          <input
            type={inputType}
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <div className="eyeIcon" onClick={handleToggle}>
            {toggleEye ? <Visibility /> : <VisibilityOff />}
          </div>
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <div className="formLink">
          <span>Don't have an account? </span>
          <Link
            to="/register"
            className="formSignup"
            style={{ textDecoration: "none" }}
          >
            Sign Up
          </Link>
          
        </div>
        <div className="imgil" />
      </form>
    </div>
  );
};

export default Login;
