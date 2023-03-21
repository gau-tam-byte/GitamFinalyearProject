import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
// import { Navigate } from 'react-router-dom'
const  Serreqs = () => {
  // const Navigates = Navigate()
  const [SerReqsbyuser, setSerReqsbyuser] = useState({userreqwithadddetails:[]})
  const [userData, seruserData] = useState({Profession:""})
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
      // const agentdata = await res.json()
      console.log(data);
      // console.log(agentdata)
      

      if(!res.status === 200 ){
        const error = new Error(res.error)
        throw error;
      }else if(res.status === 400){
        window.alert("Login First")
      }else{
        console.log(console.error({error :"eor"}))
      }
    } catch (error) {
      console.log(error)
      // Navigates('/AgentLogin')
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
      seruserData({...userData, Profession:dataagent.Profession})
      console.log(userData)
    }catch (error) {
      console.log(error)
    }
    

  }
  const calluserreqs = async()=>{
    try {
      const resreqs = await fetch('/ReqofuserRequests',{
        method:'GET',
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json",
    },
      credentials:"include"
    })
      const datareqs = await resreqs.json()
      console.log(datareqs)
      // seruserData({...userData, Profession:dataagent.Profession})
      // console.log(userData)
    }catch (error) {
      console.log(error)
    }
    

  }
  useEffect(() => {
    callpage()
    callabtagent()
    calluserreqs()
  },[])
  return (
    < >
    {/* <div>This is where all the Service Requested are shown to agents ➡️ Build Under Construction</div> */}
    <h5 className='ml-2 mr-2'>Your Profession - {userData.Profession} & All Service Request are shown here after Login</h5>

    <div>
     
                
        {SerReqsbyuser.userreqwithadddetails.map(i=>{
          return(
            
            
  
             <>
               {i.Requests.map((x) => {
               const check = x.Reqtype === userData.Profession
               if(check){
                return(
                   
                  // console.log(check)
                  <>
                  {/* <tr key={x._id}>
                    <td>{x.name}</td>
                    <td>{x.Phone}</td>
                    <td>{x.Reqtype}</td>
                    <td>{x.Description}</td>
                  </tr> */}
                  <div className='mr-3 ml-3'>
                      <Form>
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridName">
                              <Form.Label>Name</Form.Label>
                              <Form.Control readOnly value={x.name} type="text"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                              <Form.Label className='pt-0.9' >Phone</Form.Label><br></br>
                              {/* <Form.Control value={x.Phone} type="tel" /> */}
                              <div className='rounded pb-1 pt-1' style={{border:"1px solid green"}}><Link  to="tel:{x.Phone}">{x.Phone}</Link></div>
                            </Form.Group>
                          </Row>

                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                              <Form.Label>Date YYYY-MM-DD</Form.Label>
                              <Form.Control readOnly value={x.Date} />
                            </Form.Group>

                            {/* <Form.Group as={Col} controlId="formGridState">
                              <Form.Label>State</Form.Label>
                              <Form.Select defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                              </Form.Select>
                            </Form.Group> */}

                            <Form.Group as={Col} controlId="formGridZip">
                              <Form.Label>Time 24-Hour</Form.Label>
                              <Form.Control readOnly value={x.Time} />
                            </Form.Group>
                          </Row>

                          <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Request Type</Form.Label>
                            <Form.Control readOnly value={x.Reqtype} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control readOnly value={x.Description} />
                          </Form.Group>

                          

                          {/* <Form.Group className="mb-3" id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                          </Form.Group> */}

                          <Button variant="primary" type="submit">
                            Accept
                          </Button>
                          <hr></hr>
                      </Form>
                  </div>
                  {/* {x.Reqtype} === {} */}
                  
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