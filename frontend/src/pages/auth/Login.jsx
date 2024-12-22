import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { useState } from "react";
import { UserData } from "../../context/UserContext";
const Login = () => {
  const navigate = useNavigate()
  const {btnLoading,loginUser} = UserData();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async(e) => {
    e.preventDefault()
    // console.log("Login request sent with email: ", email, " and password: ", password)
    await loginUser(email, password,navigate)
  }
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>

        <button disabled={btnLoading} type="submit" className="common-btn">{btnLoading?"Wait...":"Login"}</button>
        </form>
        <p>
            Do not have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
