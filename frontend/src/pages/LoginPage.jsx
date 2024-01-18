import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function LoginPage() {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const errorRef = useRef()
  const navigate = useNavigate()

  useEffect(function () {
    if (Cookies.get("myCookie")) {
      navigate("/home")
    }
  }, [Cookies.get("myCookie")])

  async function handleLogin() {
    const data = {
      username: usernameRef.current?.value.trim(),
      password: passwordRef.current?.value.trim()
    }
    try {
      if (data.username.length > 0 && data.password.length > 0) {
        const response = await axios.post(`http://localhost:3000/login`, data, { withCredentials: true })
        if (Cookies.get("myCookie")) {
          navigate("/home")
        }
      }
    } catch (err) {
      console.error(err)
      if (errorRef.current) {
        errorRef.current.innerText = err
      }
    }
  }

  return (
    <>
      <p>Login Page</p>
      <input ref={usernameRef} type="text" placeholder="username" />
      <input ref={passwordRef} type="text" placeholder="password" />
      <button onClick={handleLogin} style={{ marginRight: "10px" }}>login</button>
      <span ref={errorRef} style={{ color: "red" }}></span>
      <div style={{ marginTop: "10px" }}>
        <span>Don't have an account? </span>
        <Link to="/register">Register</Link>
      </div>
    </>
  )
}