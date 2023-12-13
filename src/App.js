import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Login from './component/login';
import Homepage from './component/Homepage/Homepage';
import Register from './component/Register';
import OtpVerify from './component/OtpVerify/OtpVerify';
import Profile from './component/ProfileCreation/Profile';
import Header from './component/Header/Header';

function App() {
 const router =  createBrowserRouter([
    {path:"/",element:<Homepage/>},
    {path:"/Login",element:<Login/>},
    {path:"/Register",element:<Register/>},
    {path:"/otpverify",element:<OtpVerify/>},
    {path:"/profile",element:<Profile/>},
    {path:"/header",element:<Header/>}
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
