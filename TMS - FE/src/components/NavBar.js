import React from "react";
import { NavLink } from "react-router-dom";
import './css/nav.css';
import More from "./More";
export default function NavBar(props) {
  const [click, setClick] = React.useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  
  return (
    <div>
     <div className={click ? "main-container" : ""}  onClick={()=>Close()} />
      <nav className="navbar bg2" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <div className="nav-logo c1">
            <img alt="logo" src="./favicon.png" className="fa-logo"/><span className="fa-logo-text"> C<span style={{paddingLeft: "5px", fontSize: "20px"}}>Academy</span></span>
          </div>
          <ul className={click ? "nav-menu active bg2" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-links c1"
                onClick={click ? handleClick : null}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/courses"
                className="nav-links c1"
                onClick={click ? handleClick : null}
              >
                Courses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/batches"
                className="nav-links c1"
                onClick={click ? handleClick : null}
              >
                Batches
              </NavLink>
            </li>
            {props.login ? (
              <li className="nav-item">
                <More/>
              </li>
            ) : (
              <li className="nav-item">
              <NavLink
                to="/login"
                className="nav-links c1"
               onClick={click ? handleClick : null}
              >
                Log in
              </NavLink>
            </li>
            )}
            
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </ div>
  );
}