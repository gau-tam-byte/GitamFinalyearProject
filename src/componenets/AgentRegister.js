import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";


const AgentRegister = ()=> {
  // const navigates = Navigate();
  const [agentdata, setagentdata] = useState({name:"",Phone:"",NationalID:"",Profession:"",Password:"",cPassword:""})


  const handleinput = (e)=>{

    console.log(e)

    let name, value;

    name = e.target.name
    value = e.target.value

    setagentdata({...agentdata,[name]:value})

  }

  const posttodbag = async (e)=>{
    e.preventDefault()
    try {
      const {name,Phone,NationalID,Profession,Password,cPassword} = agentdata
      let res = await fetch('/agentregister',{
        method : "POST",
        headers :{
             "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, Phone, NationalID, Profession, Password, cPassword
        })
      })
      const data = await res.json()
      if(res.status === 201 || data){
        window.alert("Agent Successfully Registered!")
        // navigates('/AgentLogin')
        setagentdata({...agentdata, name:"",Phone:"",NationalID:"",Profession:"",Password:"",cPassword:""})
      }else if(res.status === 400 || !data){
        window.alert("Agent Not Registered!")
      }else{
        window.alert("Something Went Wrong??!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <div>
    <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
          <div className="border rounded border-2 border-danger"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">Agent Register</h2>
                  <div className="mb-3">
                    <Form method='POST'>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Name
                        </Form.Label>
                        <Form.Control type="text" name="name" value={agentdata.name} onChange={handleinput}  placeholder="Enter Name" />
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='username'>
                        <Form.Label className='text-centre'>
                          Phone
                        </Form.Label>
                        <Form.Control type='number' name='Phone' value={agentdata.Phone} onChange={handleinput} placeholder="Phone"></Form.Control>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          National ID
                        </Form.Label>
                        <Form.Control type="number" name="NationalID" value={agentdata.NationalID} onChange={handleinput} placeholder="Enter National-ID no." />
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='Phone'>
                        <Form.Label className='text-centre'>
                          Profession
                        </Form.Label>
                        <Form.Control type='text' name='Profession' value={agentdata.Profession} onChange={handleinput} placeholder="Enter Profession"></Form.Control>
                      </Form.Group>

                  

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="Password" value={agentdata.Password} onChange={handleinput} placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasiccPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="cPassword" value={agentdata.cPassword} onChange={handleinput} placeholder="Re-Enter Password" />
                      </Form.Group>
                      {/* <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group> */}
                      <div className="d-grid">
                        <Button variant="danger" type="submit" onClick={posttodbag}>
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                      Already have an account??{" "}
                        <Link to="/AgentLogin" className="text-dark fw-bold">Agent Sign In</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  )
}

export default AgentRegister