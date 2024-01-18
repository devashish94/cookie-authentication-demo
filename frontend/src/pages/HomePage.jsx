import axios from "axios"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  useEffect(function () {
    if (!Cookies.get("myCookie")) {
      navigate("/")
    }
  }, [document.cookie])

  async function handleLogOut() {
    const response = await axios.get("http://localhost:3000/log-out", { withCredentials: true })
    if (!Cookies.get("myCookie")) {
      navigate("/")
    }
  }

  return (
    <>
      <p>this is the home page</p>
      <button onClick={handleLogOut}>Log out</button>
    </>
  )
}