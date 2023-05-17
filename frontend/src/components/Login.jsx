import React from "react"
import { Room, Cancel } from "@material-ui/icons"
import { useRef } from "react"
import axios from 'axios'
import "./login.css"

export default function Login({setShowLogin, myStorage, setCurrentUser}){
  const [error, setError] = React.useState(false)
  const nameRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username:nameRef.current.value,
      password:passwordRef.current.value
    };
    try{
      const res = await axios.post("/users/login", user);
      myStorage.setItem("user", res.data.user)
      setCurrentUser(res.data.user)
      setShowLogin(false)
      setError(false)
    } catch(err){
      console.log(err)
      setError(true)
    }
  }

  return(
    <div className="loginContainer">
      <div className="login-logo">
      <Room/> JhovanPin
      </div>
      
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={nameRef}/>
        <input type="password" placeholder="password" ref={passwordRef}/>
        <button className="loginButton">Login</button>
        {error && <span className="failure"> Something went wrong </span> }
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)}/>
    </div>
  )
}