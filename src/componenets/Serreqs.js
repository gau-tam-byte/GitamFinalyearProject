import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

const  Serreqs = () => {

  const [SerReqsbyuser, setSerReqsbyuser] = useState({userreqwithadddetails:[]})
  const [userData, seruserData] = useState({Profession:""})
  const [status, setstatus] = useState({_id:"", Status:""})
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
     
      console.log(data);
   
      if(!res.status === 200 ){
        const error = new Error(res.error)
        throw error;
      }if(res.status === 400){
        window.alert("Login First")
      }
    } catch (error) {
      console.log(error)
  
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

    let  {_id , Status} = status

      await fetch('/updsta',{
      method:"PUT",
   
      body: JSON.stringify({_id, Status})

    })
    console.log(status)

  }

  useEffect(() => {
    callpage()
    callabtagent()
    updatestatus()
    // calluserreqs() 
  },[])

  
  return (
    < >
    {/* <div>This is where all the Service Requested are shown to agents ➡️ Build Under Construction</div> */}
    <h5 className='ml-2 mr-2'>Your Profession - {userData.Profession} & All Pending Service Request are shown here!</h5>

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
                            <Form.Group  as={Col} controlId="formGridName">
                              <Form.Label >Name</Form.Label>
                              <Form.Control  key={x._id}  readOnly value={x.name} type="text" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                              <Form.Label className='pt-0.9' >Phone</Form.Label><br></br>
                              {/* <Form.Control value={x.Phone} type="tel" /> */}
                              <div key={x._id} className='rounded pb-1 pt-1' style={{border:"1px solid green"}}><Link  to="tel:{x.Phone}">{x.Phone}</Link></div>
                            </Form.Group>
                          </Row>

                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                              <Form.Label>Date YYYY-MM-DD</Form.Label>
                              <Form.Control  key={x._id}  readOnly value={x.Date} />
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
                              <Form.Control key={x._id} readOnly value={x.Time} />
                            </Form.Group>
                          </Row>
                          <Row className='mb-3'>
                              <Form.Group as={Col} controlId="formGridAddress1">
                                <Form.Label>Request Type</Form.Label>
                                <Form.Control key={x._id} readOnly value={x.Reqtype} />
                              </Form.Group>

                              <Form.Group as={Col} controlId="formGridAddress1">
                                <Form.Label>Request Status</Form.Label>
                                <Form.Control key={x._id} readOnly value={x.Status} />
                              </Form.Group>
                          </Row>
                         <Row className='mb-3'>
                         <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control key={x._id} readOnly value={x.Description} />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Label>Request-ID</Form.Label>
                            <Form.Control key={x._id} readOnly value={x._id} />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Label>Copy Request_ID</Form.Label>
                            <Form.Control onChange={handleinput} name="_id" />
                          </Form.Group> <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Label>Update State</Form.Label>
                            <Form.Control onChange={handleinput} name="Status" />
                          </Form.Group>
                         

                         </Row>
                          

                        
                          <Button variant="primary" type="submit" onClick={updatestatus}>
                            <Link ></Link>Accept
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