import {getToken} from "../api/authentication.js"
import {Navigate} from 'react-router-dom'

export default function CheckAuth({ children }) {
    let auth = getToken();
  
    if (auth !== "") {
      return <Navigate to="/"/>;
    }
  
    return children;
  }