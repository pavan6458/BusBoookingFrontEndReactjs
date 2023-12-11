import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Login from './component/login';

function App() {
 const router =  createBrowserRouter([
    {path:"/",element:<Login/>}
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
