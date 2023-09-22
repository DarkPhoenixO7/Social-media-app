import React, { useState } from "react";
import "./auth.css";
import logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../action/authAction";
const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const loading= useSelector((state)=>state.authReducer.loading)
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);
  const handleOnchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit =(e)=>{
    e.preventDefault()
    if(isSignUp){
       data.password === data.confirmpassword?dispatch(signUp(data)): setConfirmPass(false)
    }else{
      dispatch(logIn(data))
    }
  }
  const resetForm=()=>{
    setConfirmPass(true)
    setData({firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",})
  }
  return (
    <div className="auth">
      {/*right side */}
      <div className="aLeft">
        <img src={logo} alt="" />
        <div className="appName">
          <h1>Pegion Media</h1>
          <h6>Explore and share the idea</h6>
        </div>
      </div>

      {/*right side */}
      <div className="aLeft">
        <form className="formInfo authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleOnchange}
                value={data.firstname}
              ></input>
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleOnchange}
                value={data.lastname}
              ></input>
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              onChange={handleOnchange}
              value={data.username}
            ></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleOnchange}
              value={data.password}
            ></input>
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpassword"
                onChange={handleOnchange}
                value={data.confirmpassword}
              ></input>
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            *Password is not same
          </span>
          <div>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {setIsSignUp((prev) => !prev);resetForm()}}
            >
              {isSignUp
                ? "Already have an account? Login"
                : " Don't have an account? Sign Up"}
            </span>
          </div>
          <button className="button infoButton" type="submit" disabled={loading}>
            {loading? "loading...":isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Auth;
