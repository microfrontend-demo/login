import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import axios from "axios";
//const classes = require('./login.module.css');
import "./style.component.css"

export default function Root(props) {
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const { email, password } = data;

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: [e.target.value] });
  }

  const submitHandler = e => {
    e.preventDefault();
    const userData = {
      email: data.email.toString(),
      password: data.password.toString()
    };

    console.log(userData)
    
    axios.post("http://localhost:8000/api/signin", userData).then((response) => {
      console.log(response);
      if(response.status == 200)
      {
        setSuccessful(true);
        window.location.href = "/home";
      }
    }).catch((error) => {
      console.log(error);
      const resMessage = "Login failed!";
      setMessage(resMessage);  
      setSuccessful(false);
    });
    
  }
  return (
    <BrowserRouter basename="/">
      {!successful && (
        <div className="login-page">
          <div className="form">
            <form className="login-form" onSubmit={submitHandler}>
              <input type="email" name="email" placeholder="email" value={email} onChange={changeHandler} />

              <input type="password" name="password" placeholder="password" value={password} onChange={changeHandler} />

              <button>Login</button>
              <p className="message">Not registered? <a href="/signup">Create an account</a></p>
            </form>
          </div>
        </div>
      )}
      {message && (
        <div className="form-group">
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </BrowserRouter>
  )
}
