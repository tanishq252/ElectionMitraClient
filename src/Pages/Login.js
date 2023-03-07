import React,{useState} from 'react'; 
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from "../Images/login.svg"
import "../CSS/Login.css";

const Login=()=>{
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");  

    const validate=async(e)=>{
        e.preventDefault();
        try{
            if(email==""){
                toast.warn("Please enter user email",{position: toast.POSITION.TOP_CENTER, autoClose: 1500});
                console.log("Email "+email);
            }
            else if(password==""){
                toast.warn("Please enter user password",{position: toast.POSITION.TOP_CENTER, autoClose: 1500});
                console.log("Password "+password);
            }
            else{
            const res = await axios.post('http://localhost:8080/admin/login', {
                    email: email,
                    password: password
                });
                console.log(res);
                toast.success(` ${email} verified successfully!`, {position: toast.POSITION.BOTTOM_CENTER, autoClose: 1000,})
            }
        }
        catch(error){
            console.log(email+" "+password);
            console.log(e.response.data);
            if(e.response.data == "No such user exists"){
                toast.error("Wrong Credentials",{position: toast.POSITION.TOP_CENTER, autoClose: 1500});
            }else if(e.response.data == "Invalid password"){
                toast.error("Wrong Credentials",{position: toast.POSITION.TOP_CENTER, autoClose: 1500})
            }
        }
    }
    return(
        <div className="outer-container">
            <div className="inner-container">
            <form className="login-form" action="#">
                <input className='newinput' type="text" placeholder="Email" value={email} onChange={e=>setemail(e.target.value)}/>
                <input  className='newinput' type="password" placeholder="Password" value={password} onChange={e=>setpassword(e.target.value)}/>
                <button type="submit" className="btn-submit" onClick={validate}>Sign in</button>
            </form>
            <div className='login-image'>
                <img src={login} width="400" height="400"></img>
            </div>
            </div>
        </div>
    );
}

export default Login;