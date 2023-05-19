import React from "react"
import { Room, Cancel } from "@material-ui/icons"
import { useRef } from "react"
import axios from 'axios'
import "./register.css"

export default function Register({setShowRegister}){
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState(false)
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value
    };
    try{
      const res = await axios.post("https://react-travel-app-api.vercel.app/api/users/register", newUser);
      setError(false)
      setSuccess(true)
    } catch(err){
      console.log(err)
      setError(true)
      setSuccess(false)
    }
  }

  return(
    <div className="registerContainer">
      <div className="logo">
      <Room/> JhovanPin
      </div>
      
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={nameRef}/>
        <input type="email" placeholder="Email" ref={emailRef}/>
        <input type="password" placeholder="password" ref={passwordRef}/>
        <button className="registerButton">Register</button>
        {success && <span className="success"> Welcome! You can now login! </span> } 
        {error && <span className="failure"> Something went wrong </span> }
      </form>
      <Cancel className="registerCancel" onClick={() => setShowRegister(false)}/>
    </div>
  )
}