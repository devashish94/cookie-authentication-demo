import axios from "axios"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const errorRef = useRef()
  const navigate = useNavigate()

  async function handleRegister() {
    const data = {
      username: usernameRef.current?.value.trim(),
      password: passwordRef.current?.value.trim()
    }
    try {
      if (data.username.length > 0 && data.password.length > 0) {
        const response = await axios.post(`http://localhost:3000/register`, data)
        console.log(response)
      }
      navigate("/")
    } catch (err) {
      console.error(err)
      if (errorRef.current) {
        errorRef.current.innerText = err
      }
    }
  }

  return (
    <>
      <p>Register Page</p>
      <input ref={usernameRef} type="text" placeholder="username" />
      <input ref={passwordRef} type="text" placeholder="password" />
      <button onClick={handleRegister} style={{ marginRight: "10px" }}>register</button>
      <span ref={errorRef} style={{ color: "red" }}></span>
    </>
  )
}