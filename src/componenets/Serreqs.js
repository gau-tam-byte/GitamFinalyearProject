import React from 'react'
import { useEffect } from 'react'
// import { Navigate } from 'react-router-dom'
function Serreqs() {
  // const Navigates = Navigate()
  // const [userData, seruserData] = useState({})
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
      console.log(data);
      // seruserData(data)

      if(!res.status === 200 ){
        const error = new Error(res.error)
        throw error;
      }
    } catch (error) {
      console.log(error)
      // Navigates('/AgentLogin')
    }
  }
  useEffect(() => {
    callpage()
  },[])
  return (
    <div>Serreqs</div>
  )
}

export default Serreqs