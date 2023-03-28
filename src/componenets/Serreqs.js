import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import bgg from '../images/c.png'
import {SiNamecheap,SiStatuspage} from "react-icons/si"
import {FiMail,  FiPhoneCall} from "react-icons/fi";
import { BiGitPullRequest,BiKey,BiTimeFive } from "react-icons/bi";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { MdDescription } from "react-icons/md";

import bg from '../images/cool-backgroun.png'


const  Serreqs = () => {
  // const navvi = Navigate()
  const naviii = useNavigate()
  const [SerReqsbyuser, setSerReqsbyuser] = useState({userreqwithadddetails:[]})
  const [userData, seruserData] = useState({Profession:""})
  const [status, setstatus] = useState({email:"",descc:"",Status:""})
  // const [updatereqstatus, setupdatereqstatus] = useState({updatependingstatus:[]})

  const callpage = async ()=>{
    try {
      const res = await fetch('/Serreqs',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json",
        },
        credentials:"include"  
      })
      const data = await res.json()
      setSerReqsbyuser({...SerReqsbyuser, userreqwithadddetails:data})
     
  
    } catch (error) {
      console.log(error)
      naviii('/AgentLogin')
      

  
    }
  }

  const callabtagent = async()=>{
    try {
      const resagent = await fetch('/AboutAgent',{
        method:'GET',
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json",
    },
      credentials:"include"
    })
      const dataagent = await resagent.json()
      console.log(dataagent)
      seruserData({...userData, Profession: dataagent.Profession})
      console.log(userData)
    }catch (error) {
      console.log(error)
      naviii('/AgentLogin')
    
    }

  }
  // const calluserreqs = async()=>{
  //   try {
  //     const resreqs = await fetch('/ReqofuserRequests',{
  //       method:'GET',
  //       headers:{
  //         Accept:"application/json",
  //         "Content-Type":"application/json",
  //   },
  //     credentials:"include"
  //   })
  //     const datareqs = await resreqs.json()
  //     console.log(datareqs)
  //     setupdatereqstatus({...updatereqstatus,updatependingstatus:datareqs})
  //      console.log(updatereqstatus)
  //   }catch (error) {
  //     console.log(error)
  //   }
  // }
  const handleinput = (e)=>{
    let name, value

    name = e.target.name
    value = e.target.value
    setstatus({...status, [name]:value  })

    console.log(status)
  }
  const updatestatus = async ()=>{

    let  {email ,descc, Status} = status

      await fetch('/updsta',{
      method:"PUT",

      body: JSON.stringify({email,descc, Status})

    })
    console.log(status)

  }

  useEffect(() => {
    callpage()
    callabtagent()
    // updatestatus()
    // calluserreqs() 
  },[])

  
  return (
    < >
    {/* <div>This is where all the Service Requested are shown to agents ➡️ Build Under Construction</div> */}
    <h5 className='ml-2 mr-2'>Your Profession - {userData.Profession} & All Pending Service Request are shown here!</h5>

    <div style={{backgroundImage:`url(${bgg})`,backgroundSize: 'cover', height:"auto"}} className="mr-2 pl-2 mb-2 mt-5 rounded">
     
                
        {SerReqsbyuser.userreqwithadddetails.map(i=>{
          return(
    
             <>
               {i.Requests.map((x) => {
               const check = x.Reqtype === userData.Profession
               if(check){
                return(
                   
                
                  <> 
                 {/* className='mr-3 ml-3' */}
                  <div style={{backgroundImage:`url(${bg})`,backgroundSize: 'cover', height:"auto"}} className="pr-2 pl-2 pb-2 mt-5 rounded">
                      <Form>
                          <Row className="mb-3">
                            <Form.Group  as={Col} controlId="formGridName">
                              <Form.Label >{<SiNamecheap/>} Name</Form.Label>
                              <Form.Control  key={x._id} readOnly value={x.name} type="text" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                              <Form.Label className='pt-0.9' >{<FiPhoneCall/>} Phone</Form.Label><br></br>
                              {/* <Form.Control value={x.Phone} type="tel" /> */}
                              <div key={x._id} className='rounded pb-1 pt-1' style={{border:"1px solid green"}}><Link  to="tel:{x.Phone}">{x.Phone}</Link></div>
                            </Form.Group>
                          </Row>

                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                              <Form.Label>{<BsFillCalendar2DateFill/>} Date YYYY-MM-DD</Form.Label>
                              <Form.Control  key={x._id}  readOnly value={x.Date} />
                            </Form.Group>

                            

                            <Form.Group as={Col} controlId="formGridZip">
                              <Form.Label>{<BiTimeFive/>} Time 24-Hour</Form.Label>
                              <Form.Control key={x._id} readOnly value={x.Time} />
                            </Form.Group>
                          </Row>
                          <Row className='mb-3'>
                              <Form.Group as={Col} controlId="formGridAddress1">
                                <Form.Label>{<BiGitPullRequest/>} Request Type</Form.Label>
                                <Form.Control key={x._id} readOnly value={x.Reqtype} />
                              </Form.Group>
                              <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Label>{<BiKey/>} Request-ID</Form.Label>
                            <Form.Control key={x._id} readOnly value={x._id} />
                          </Form.Group>
                             
                          </Row>
                          <Row className='mb-3'>
                          <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Label>{<MdDescription/>} Description</Form.Label>
                            <Form.Control key={x._id} readOnly value={x.Description} />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Label>{<MdDescription/>} Copy Description</Form.Label>
                            <Form.Control onChange={handleinput} name="descc" />
                          </Form.Group> 
                          </Row>
                          <Row className='mb-3'>
                          <Form.Group as={Col} controlId="formGridAddress1">
                              <Form.Label>{<FiMail/>} Email</Form.Label>
                                <Form.Control key={x._id} readOnly value={x.email} />
                              </Form.Group>

                          <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Label>{<FiMail/>} Copy Email</Form.Label>
                            <Form.Control onChange={handleinput} name="email" />
                          </Form.Group> 
                          </Row>
                         <Row className='mb-3'>
                         
                         
                          
                          <Form.Group as={Col} controlId="formGridAddress1">
                              <Form.Label>{<SiStatuspage/>} Request Status</Form.Label>
                                <Form.Control key={x._id} readOnly value={x.Status} />
                              </Form.Group>
                          <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Label>{<SiStatuspage/>} Update REQ Status</Form.Label>
                            <Form.Control onChange={handleinput} name="Status" />
                          </Form.Group>
                         
                         </Row>
                          
                          <Button variant="primary" type="submit" onClick={updatestatus}>
                            <Link ></Link>Confirm Accept
                          </Button>
                         
                      </Form>
                  </div>
                  

                  
                  </>
                )
               }
               else{
                console.log("not matched ")
               }

              })}
             </> 
          )
        })}

    </div>

    </>
    
  )
}

export default Serreqs