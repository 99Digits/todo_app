import React, { useState } from 'react'
import Header from '../components/Header'
import { Button, Form, Row } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRegister } from '../service/Allapi';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import './register.css'
// import {userRegister} from '../service/Allapi'

function Register() {
  const [loader,setloader]=useState(false)
  const nav= useNavigate()

  const [inputData,setinputData]=useState({
    username:"",
    psw:"",
    mobile:""
  })
  // to update input data
  const setinputvalue=(e)=>{
    const {name,value}=e.target
    setinputData({...inputData,[name]:value})
  }
  console.log(inputData);

  const Register=async(e)=>{
    e.preventDefault()
    const {username,psw,mobile}=inputData;
    if(username===""){
      toast.error("User Name Required")
    }
    else if(psw===""){
      toast.error("Password Required")
    }
    else if(mobile===""){
      toast.error("Mobile Number Required")
    }
    else{

      const data=new FormData()
      data.append("username",username)
      data.append("psw",psw)
      data.append("mobile",mobile)

      const headerConfig={
        "content-Type":"multipart/form-data"
      }
      try{
        const response=await userRegister(data)
        console.log(response);
        if(response.status===200){
          toast.success("user Successfully Registered")
          setloader(true)

          setTimeout(() => {
            setloader(false)
            nav('/')
            
          }, 4000);

        }

      }
      catch(err){
        console.log(err);
      }
     

      


    }


  }
  return (
    <>
    <Header/>

    <div className="container ">
        <Row className="mt-4">
          <div className="col-md-6 shadow-lg p-3 mb-5 bg-white rounded">
            <h3 style={{textAlign:'center',color:'green'}}>Register Here</h3>
          <Form enctype="multipart/form-data">
            
            
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label><b>username</b></Form.Label>
        <Form.Control type="text" placeholder="Enter the username" name='username' value={inputData.username} onChange={setinputvalue}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label><b>Enter Password</b> </Form.Label>
        <Form.Control type="password" name='psw' value={setinputData.psw} onChange={setinputvalue} placeholder="Enter a password" />
        <Form.Group className="mb-3" >
        <Form.Label className='mt-2'> <b>Enter your mobile number</b> </Form.Label>
        <Form.Control type="number" name='mobile' value={setinputData.mobile} onChange={setinputvalue} placeholder="Enter the mobile number" />
      </Form.Group>
      
        <Button onClick={Register} className="btn btn-success mt-3">Signup</Button>
        <div className="mt-5 ms-5">
     {loader===true? <Loader/>:''}

      </div> 
        <div className="text-primary mt-4">Dont have an account Signup here <a href="/" className="btn btn-primary">Login</a></div>
      </Form.Group>
      </Form>
          </div>
          <div className="col-lg-5">
            <img src="https://www.esds.co.in/blog/wp-content/uploads/2019/03/httpscdn.dribbble.comusers1784953screenshots4638919cloud_security_small.gif.gif" alt="" />
          </div>
        </Row>
      </div>
      <ToastContainer position='top-center'/>
    
    </>
  )
}

export default Register