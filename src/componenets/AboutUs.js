import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container, Row,Col } from 'react-bootstrap'


const AboutUs = () => {
  const Navigates = useNavigate()
  const [userData, seruserData] = useState({})
  const callaboutuspage = async ()=>{
    try {
      const res = await fetch('/AboutUs',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json",
        },
        credentials:"include"  
      })
      const data = await res.json()
      console.log(data);
      seruserData(data)

      if(!res.status === 200 ){
        const error = new Error(res.error)
        throw error;
      }
    } catch (error) {
      console.log(error)
      Navigates('/login')
    }
  }
  useEffect(() => {
    callaboutuspage()
  },[])
  const tokenss = userData.tokens
  console.log(tokenss)

  return (
   <>

   <Container>
   {/* <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}> */}
   <div className="container md-sm mt-4">
    <form method="GET">
        <div className='row'> 
            <div className='col-md-4'>
              <p> Image Here</p>
            </div>
            <div className='col-md-6'>
                <h5>My Name: {userData.name}</h5>
                {/* <h6>Web developer</h6> */}
                {/* <p className='profile-rating mt-3 mb-5'>Ranking</p> */}

                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab "href="#Home" role="tab">About</a>
                  </li>
                  <li className="nav-item">
                  <a className="nav-link active" id="profile-tab "href="#profile" role="tab">Timeline</a>
                  </li>
                </ul>
            </div>
    
        </div>
            <div className='row'>
              <div className='col-md-4'>
                  <div className='profile-work'>
                    <p>Work Link</p>
                    
                  </div>
              </div>

            <div className='col-md-8 pl-5 about-info'>
                <div className='tab-content profile-tab' id='myTabContent'>
                    <div className='tab-pane fade show active' id='Home' role="tabpanel" aria-labelledby='home-tab'></div>
                      <div className='row'>
                          <div className='col-md-6'>
                              <label>User Id</label>
                          </div>
                          <div className='col-md-6'>
                            <p>{userData._id}</p>
                          </div> 
                          <div className='col-md-6'>
                              <label>Email</label>
                          </div>
                          <div className='col-md-6'>
                            <p>{userData.email}</p>
                          </div> 
                          <div className='col-md-6'>
                              <label>Username</label>
                          </div>
                          <div className='col-md-6'>
                            <p>{userData.username}</p>
                          </div> 
                          <div className='col-md-6'>
                              <label>Phone</label>
                          </div>
                          <div className='col-md-6'>
                            <p>{userData.Phone}</p>
                          </div> 
                          
                        
                    
                      </div>
                </div>
            </div>

        </div>
    </form>
    </div>
    {/* </Col>
    </Row> */}

    </Container>
   
   </>
  )
}

export default AboutUs