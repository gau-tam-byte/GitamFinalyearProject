import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
// import FormText from 'react-bootstrap'

const Reqser = () => {
  const navigates = useNavigate();
  const [userData, seruserData] = useState({name:"",email:"",Phone:"",Reqtype:"",Date:"", Time:"",Description:"", Status:"Pending...."})

  const callreqserpage = async ()=>{

      try {
        const res = await fetch('/getdata',{
          method:"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        credentials:"include"
        })
        const data = await res.json()
        console.log(data)
        seruserData({...userData,name:data.name,email:data.email,Phone:data.Phone})
    
        if(!res.status === 200 ){
          const error = new Error(res.error)
          throw error
        }
      } catch (err) {
        console.log(err)
        navigates('/login')
      }
  }  
 useEffect(() => {
   callreqserpage()
 },[])

 const handleinputs = function(e) {
  const name = e.target.name;
  const value = e.target.value

  seruserData({...userData, [name]:value})
 }

const submitform = async()=>{

  const {name,email,Phone,Reqtype,Date,Time,Description,Status} = userData;

  const res = await fetch('/Reqser',{
    method:"POST",
    headers :{
      "Content-Type ": "application/json"
    },
    body: JSON.stringify({
      name,email,Phone,Reqtype,Date,Time,Description,Status
    })
    

  })
  const data = await res.json();
  if(res.status === 200 || data){
    window.alert("Request Sent")
    seruserData({...userData, name:"",email:"",Phone:"",Reqtype:"",Date:"", Time:"", Description:"", Status:""})
    navigates('/Reqser')
  }else if(res.status === 422 || !data){
    window.alert("plzz Fill the Data")
    console.log("message not sent")
  }
  else{
    window.alert("Request not sent")
    navigates('/Reqser')
  }
}
  return (
  <>
  <Container>
  <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
   <div className="container md-sm mt-0">
      <h2 className="mb-4" >Request Service</h2>
      <form method='POST'>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input className="form-control" type="text" id="name" name='name' readOnly autoComplete='off' defaultValue={userData.name}  required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input className="form-control" type="email" id="email" name="email" readOnly autoComplete='off' defaultValue={userData.email}  required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="Phone">
            Phone
          </label>
          <input className="form-control" type="number" id="Phone" name="Phone" readOnly autoComplete='off' defaultValue={userData.Phone}  required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="Reqtype">
            Request Type
          </label>
          <select className="form-control" name="Reqtype" id="Reqtype"  onChange={handleinputs} required >
              <option value="">Please choose a Service U Want🔻</option>
              <option value="AC Technician">AC Service</option>
              <option value="Electrician">Electricity Service</option>
              <option value="Plumber">Plumbing Service</option>
              <option value="Carpenter">Wood Work Service</option>
              <option value="Car Mechanic">Car Service</option>
              <option value="Bike Mechanic">Bike Service</option>
          </select>
          {/* <input className="form-control" type="text" id="Reqtype" name="Reqtype" autoComplete='off' value={userData.Reqtype} onChange={handleinputs} required /> */}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="Date">
            Date
          </label>
          <input className="form-control" type="date" id="Date" name="Date" autoComplete='off' value={userData.Date} onChange={handleinputs} required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="Time">
            Time
          </label>
          <input className="form-control" type="time" id="Time" name="Time" autoComplete='off' value={userData.Time} onChange={handleinputs} required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="status">
            Request Status Initially
          </label>
          <input className="form-control" id="status"  name="Status"  autoComplete='off' value={userData.Status} readOnly required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            Description
          </label>
          <textarea className="form-control" id="message"  name="Description"  autoComplete='off' value={userData.Description} onChange={handleinputs} required />
        </div>
        
        <button className="btn btn-success" type="submit" onClick={submitform}>
          Send Request
        </button>
      </form>
    </div>
    </Col>
  </Row>
  </Container>
</>
)}

export default Reqser