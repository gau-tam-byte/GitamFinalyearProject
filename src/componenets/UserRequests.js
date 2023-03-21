import React from 'react'
import { useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react'

const UserRequests =() =>{

  useEffect(() => {
    userrequests()
  },[])

  const [arrofobj, setarrofobj] = useState({arr:[]})
  const userrequests = async()=>{
    try {
      const res = await fetch('/UserRequests',{
        method:"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
          },
          credentials:"include"  
      })
      const data = await res.json()
      console.log(data)
      setarrofobj({...arrofobj, arr:data})
      console.log(arrofobj)
    } catch (error) {
      console.log({error:"data is not recieved"})
    }

  }

  // const dis = (arr)=>{
  //   if(!arr) return console.log("nono")

  //  return arr.forEach(element => {
  //   <li>{element}</li>
  //  });
  // }

  // const displayreqs =(arr) =>{
  //   if(!arr.length) return null

  //   return arr.map((arr,Phone)=>(
  //     <div key={Phone}>
  //       <li>{arr.name}</li>
  //       <li>{arr.Phone}</li>
  //       <li>{arr.Reqtype}</li>
  //       <li>{arr.email}</li>
  //       <li>{arr.Time}</li>
  //     </div>

  //   ))
  // }

  return (
  <>
  <div style={{border: '2.7px solid black'}} className='rounded warning mr-2 ml-2 mt-5 pt-3 '>
  <Table responsive='md' bordered='dark' striped hover size='md' >
  <thead className='table-secondary'> 
        <tr >
          <th>All-Requests with Your ID</th>
          <th>Request Type</th>
          <th>Date</th>
          <th>Time</th>
          <th>Description</th>
        </tr>
      </thead>
    {arrofobj.arr.map(i=>{
      return(
      // <tbody className='table-warning border rounded'>
        <tr className='table-warning'>
          <td>{i._id}</td>
          <td>{i.Reqtype}</td>
          <td>{i.Date}</td>
          <td>{i.Time}</td>
          <td>{i.Description}</td>
        </tr>
      // </tbody>
      )
    })}
  </Table>
  </div>
  </>
  )
}

export default UserRequests