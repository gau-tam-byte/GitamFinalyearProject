import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'


const AboutMe = () => {
  const Navigates = useNavigate()
  const [userData, seruserData] = useState({})
  const callaboutuspage = async ()=>{
    try {
      const res = await fetch('/AboutMe',{
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
 

  return (
   <>

   <Container >
  
   <div className="container md mt-4 rounded" style={{border:'1px solid black'}}>
    <form method="GET">
        <div className='row'> 
            <div className='col-md-6'>
              <h5>Image</h5>
            </div>
            <div className='col-md-6'>
                <h5>My Name - {userData.name}</h5>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item pt-5">
                    <a className="nav-link active" id="home-tab "href="#Home" role="tab">About Me</a>
                  </li>
                  {/* <li className="nav-item">
                  <a className="nav-link active" id="profile-tab "href="#profile" role="tab">Timeline</a>
                  </li> */}
                </ul>
            </div>
        </div>
            <div className='row'>
              <div className='col-md-6'>
                  <div className='profile-work'>
                    <h5>Work Link's</h5>  
                  </div>
              </div>

            <div className='col-md-6 about-info'>
                <div className='tab-content profile-tab' id='myTabContent'>
                    <div className='tab-pane fade show active' id='Home' role="tabpanel" aria-labelledby='home-tab'>
                    <div className='row'>
                          <div className='col-md-6'>
                            <label>Username </label>
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
                          <div className='col-md-6'>
                              <label>Email</label>
                          </div>
                          <div className='col-md-6'>
                            <p>{userData.email}</p>
                          </div> 
                          <div className='col-md-6'>
                              <label>User-ID</label>
                          </div>
                          <div className='col-md-6'>
                            <p>{userData._id}</p>
                          </div> 
                        
                      </div>
                    </div>
                     
                </div>
            </div>

        </div>

    </form>
    <div>
      <Link  to='/UserRequests'>Your Service Requests</Link>
    </div>
    </div>
   
    

    </Container>
   </>
  )
}

export default AboutMe