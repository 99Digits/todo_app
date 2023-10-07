import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, Col, Form, Row } from "react-bootstrap";
import Loader from "./Loader";
import { Loginuser, loadingdata } from "../service/Allapi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import './login.css'
import ServerLoader from "./ServerLoader";

function Login() {
  useEffect(()=>{
    const serverloadingdata=async()=>{
      try{

        const response=await loadingdata()
        console.log(response);
        if(response.status===200){
          setsloader(false)
          
        }



      }
      catch(er){
        console.log(er);
      }
    }
    serverloadingdata()

  },[])
  const nav=useNavigate()
  const [sloader,setsloader]=useState(true)
  const [loader,setloader]=useState(false)

  const [inputData,setinputData]=useState({
    mobile:"",
    psw:""
  })

  const inputvalue=(e)=>{
    const {name,value}=e.target
    setinputData({...inputData,[name]:value})
  }
  console.log(inputData);
  const LoginData=async(e)=>{
    e.preventDefault()
    const {mobile,psw}=inputData

    if(mobile===""){
      toast.error("Your Registered Mobile Required")
      
    }
    else if(psw===""){
      toast.error("Your Password required")
    }
    else{
      const data=new FormData()
      data.append("mobile",mobile)
      data.append("psw",psw)

      // const headerConfig={
      //   "content-Type":"multipart/form-data"
      // }

      try{
        const response=await Loginuser(data)
        console.log(response);
        if(response.status===200){
          // alert("register successfully")
          toast.success("Login Successfully ")
          setloader(true)
          // console.log();
          setTimeout(() => {
            setloader(false)
            localStorage.setItem("username",response.data['data'].username)
            localStorage.setItem("mobile",response.data['data'].mobile)
            localStorage.setItem("token",response.data['token'])
            nav('/dashboard')
            
          }, 5000);
        }

      }catch(err){
        console.log(err);
      }
    }


  }
  return (
    <>
      <Header />
     { sloader?<ServerLoader/>:
      <div className="container ">
        <Row className="mt-4">
          <div className="col-md-6 shadow-lg p-3 mb-5 bg-white rounded">
          <h3 style={{textAlign:'center',color:'green'}}>Login Here</h3>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Enter mobile you registred</Form.Label>
        <Form.Control type="number" name="mobile" value={inputData.mobile} onChange={inputvalue} placeholder="Enter the mobile number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Enter Password</Form.Label>
        <Form.Control type="password" name="psw" value={inputData.psw} onChange={inputvalue} placeholder="Enter the Password" />
        <Button onClick={LoginData} className="btn btn secondary mt-3">Login</Button>
        
       {loader===true? <div className="mt-5">
          <Loader/>
        </div>:''}
        <div className="text-primary mt-4">Dont have an account Signup here <a href="/register" className="btn btn-success">SignUp</a></div>
      </Form.Group>
          </div>
          <div className="col-lg-5">
            <img src="https://media.tenor.com/p0G_bmA2vSYAAAAd/login.gif" alt="" />
          </div>
        </Row>
      </div>}
      <ToastContainer position='top-center'/>
    </>
  );
}

export default Login;
