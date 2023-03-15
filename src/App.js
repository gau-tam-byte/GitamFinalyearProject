// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom'
import Navbarr from './componenets/Navbar';
import Home from './componenets/Home';
import AboutUs from './componenets/AboutUs';
import Register from './componenets/Register';
import Login from './componenets/Login';
import Reqser from './componenets/Reqser';
import Logout from './componenets/Logout';

function App() {
  return (
    <>
    <Navbarr/>

    <Routes>
      <Route path='/Home' element={<Home/>}></Route>
      <Route path='/AboutUs' element={<AboutUs/>}></Route>
      <Route path='/Register' element={<Register/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/Logout' element={<Logout/>}></Route>
      <Route path='/Reqser' element={<Reqser/>}></Route>
    </Routes>
   
    </>
  );
}

export default App;
