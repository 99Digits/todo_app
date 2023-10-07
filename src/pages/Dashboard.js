import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form, Modal, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap'
import { Alldata, Todaodata, deltodo } from '../service/Allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./Loader";
import Typewriter from "typewriter-effect";
import './dash.css'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  useEffect(()=>{
   
    if(!localStorage.getItem("token")){
      alert('login required')
      nav('/')
    }
   

AllTodo()

  },[])
  const [imagedata,setimagedata]=useState([])
  const Logout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("mobile")
    nav('/')
  }
  const nav=useNavigate()
  const [alltodo,setalltodo]=useState([])
  const Deltodo=async(num)=>{
    const headerConfig = {
      "Content-Type": "multipart/form-data",
      "varify-token": localStorage.getItem("token"),
      "mobile": localStorage.getItem("mobile")
    };
    try{

      const response=await deltodo(num,headerConfig)
      console.log(response);
      setalltodo(response.data)

    }catch(err){
      console.log(err);
    }

  }
  const AllTodo = async () => {
    const mobile = localStorage.getItem("mobile");
    console.log(mobile); 

   
  
    // const bodyData = {
    //   mobile: mobile
    // };
  
    const headerConfig = {
      "Content-Type": "multipart/form-data",
      "varify-token": localStorage.getItem("token"),
      "mobile": localStorage.getItem("mobile")
    };
  
    try {
      const response = await Alldata(headerConfig);
      console.log(response.data);
      setalltodo(response.data)
    } catch (err) {
      console.log(err);
    }
  };
 
  const [loader,setloader]=useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputData,setinputData]=useState({
    // mobile:"",
    title:"",
    datas:"",
    date:""
  })

  const inputvalue=(e)=>{
    const {name,value}=e.target
    setinputData({...inputData,[name]:value})
    

  }
  console.log(inputData);
  // functyion
  const Todo=async(e)=>{
    e.preventDefault()
    


    const {title,datas,date}=inputData
    // if(mobile===""){
    //   toast.error("mobile required")
    // }
    if(title===""){
      toast.error("title required")

    }
    else if(datas===""){
      toast.error("Data required")

    }
    else{
      const bodydata=new FormData()
// bodydata.append("mobile",mobile)
bodydata.append("title",title)
bodydata.append("datas",datas)
bodydata.append("date",date)
const headerConfig={
  "content-Type":"multipart/form-data",
  "varify-token":localStorage.getItem("token"),
  "mobile":localStorage.getItem("mobile")
}

    try{
     

        const response=await Todaodata(bodydata,headerConfig)   
        console.log(response);
        if(response.status===200){
          setloader(true)
          toast.success("success")
          setalltodo(response.data)
          setTimeout(() => {
            setloader(false)
            handleClose(true)

          
          }, 3000);
          
        }
        else{
          toast.error("internal server error")
        }
       

  

    }
    catch(err){
      console.log(err);
    }

    }
// alert('sfsd')

  
   
  }
  return (
    <>
    
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Welcome To My Works</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" style={{color:'blue'}}>Home</Nav.Link>
            <Nav.Link  style={{color:'green'}} variant="primary" onClick={handleShow}>
       Add New Task
            </Nav.Link>
            <Nav.Link onClick={Logout} style={{color:'red'}}>Logout</Nav.Link>

       
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


{/* body */}

<div className="app mt-4">


  <Typewriter onInit={(typewriter) => {
                    typewriter
                        .typeString("Developed And Designed By Yadu Krishna M")
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("Developed IN MERN Stack Technology")
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("Welcome to Your Personal App")
                        .start();
                }}/>
</div>
<Row>
  <div className="col-lg-4"></div>
  <div className="col-lg-4">
    <img src="https://cdn.dribbble.com/users/4241563/screenshots/11874468/media/7796309c77cf752615a3f9062e6a3b3d.gif" alt="image" />
  </div>
</Row>
<Row>
  {alltodo.map((data,index)=>(

<div className="col-lg-4">
  <div className="cardz">

<Card className='shadow-lg p-3 mb-5 bg-white rounded' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        
        <Card.Text>
          {data.datas}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">{data.date}</Card.Subtitle>
        <Card.Link onClick={()=>Deltodo({index})} className='btn btn-danger'>Task Done <i class="fa-solid fa-trash-can"></i></Card.Link>
      </Card.Body>
    </Card>


</div>

  </div>


  ))}


   
</Row>














    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
   <Row>
    <div className="col-lg-5">

    {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Enter mobile you registred</Form.Label>
        <Form.Control type="number" name="mobile" value={inputData.mobile} onChange={inputvalue} placeholder="Enter the mobile number" />
      </Form.Group> */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Enter the task Title</Form.Label>
        <Form.Control type="text" name="title" value={inputData.title} onChange={inputvalue} placeholder="Enter your task Title" />

        <Form.Label className='mt-2'>Enter the task Details</Form.Label>
        <Form.Control type="text" name="datas" value={inputData.datas} onChange={inputvalue} placeholder="Enter your task Details" />

        <Form.Label className='mt-2'>Enter the Date</Form.Label>
        <Form.Control type="date" name="date" value={inputData.date} onChange={inputvalue} placeholder="Enter your task Details" />
        
        {/* <Button  className="btn btn-success mt-3">Add Task</Button> */}
        
       {/* {loader===true? <div className="mt-5">
          <Loader/>
        </div>:''} */}
      </Form.Group>
    </div>
   </Row>
   {loader?<div className="mt-3">
    <Loader></Loader>
   </div>:''}
 


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={Todo} variant="success">Add Task</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme="colored"/>
    
    </>
  )
}

export default Dashboard