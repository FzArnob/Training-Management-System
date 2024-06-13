import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import RequireAuth from "./components/RequireAuth";
import CheckAuth from "./components/CheckAuth";
import NavBar from './components/NavBar';
import { useState } from 'react';
import store from './redux/store';
import Apply from "./pages/Apply";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import Batches from "./pages/Batches";
import Batch from "./pages/Batch";
import Dashboard from "./pages/Dashboard";
function App() {
  const [login, setLogin] = useState(store.getState().auth.loggedin);
  store.subscribe(() =>{
    if(store.getState().auth.loggedin !== login) setLogin(store.getState().auth.loggedin);
    // console.log('sub-app', store.getState());
  })
  return (
    <>
    <NavBar login={login}/>
    <div className='top-80'>
          <Routes>
            
            <Route 
            path="/" 
            element={
            <RequireAuth>
              <Dashboard/>
            </RequireAuth>
            } />
            <Route 
            path="/batches" 
            element={
            <RequireAuth>
              <Batches/>
            </RequireAuth>
            } />
            <Route 
            path="/courses" 
            element={
            <RequireAuth>
              <Courses/>
            </RequireAuth>
            } />
            <Route 
            path="/profile" 
            element={
            <RequireAuth>
              <Profile/>
            </RequireAuth>
            } />
            <Route 
            path="/batch" 
            element={
            <RequireAuth>
              <Batch/>
            </RequireAuth>
            } />
            <Route 
            path="/login" 
            element={
            <CheckAuth>
              <Login/>
            </CheckAuth>
            } />
            <Route 
            path="/register" 
            element={
            <CheckAuth>
              <Register/>
            </CheckAuth>
            } />
            <Route 
            path="/apply" 
            element={
            <CheckAuth>
              <Apply/>
            </CheckAuth>
            } />
          </Routes>
    </div>
    </>
  );
}

export default App;
