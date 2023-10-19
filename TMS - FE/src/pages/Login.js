import './css/login.css'
import store from '../redux/store';
import { Link } from 'react-router-dom'
import { userLogin} from '../api/authentication'
import { useState } from 'react';
import { authSuccess } from '../redux/actions';
import { setCookie } from '../cookies/cookieHandler';
import { showNotification } from '../features/notification';
export default function Login(props) {
    const [values, setValues] = useState({
        email: '',
        password: ''
        });
    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
        ...values,
        [e.target.name]: e.target.value
        }));
    };
    const checkRole = (roles, roleName) => {
       return roles.some(role => (role.roleName === roleName))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        userLogin(values)
        .then((response)=>{
            // console.log("response",response);
            if(response.status === 200){
                var user = response.data.user;
                user.isAdmin = checkRole(user.role, "ADMIN");
                user.isTrainer = checkRole(user.role, "TRAINER");
                user.isTrainee = checkRole(user.role, "TRAINEE");
                store.dispatch(authSuccess(user));
                console.log(store.getState().auth);
                setCookie("token.tms", response.data.jwtToken, 1)
                showNotification("Login successful", "success");
            } else showNotification("Failed to login", "error");
        }).catch((err) => {
            // console.log(err);
            if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
            else showNotification("Failed to login", "error");
          })
      }
    return (
        <>
        <div className='backview' id="animatedBackground"></div>
        <div className='bg2-change login-box'>
            <form onSubmit={handleSubmit}>
                <label className='input-label c1'>Email</label>
                <input className='input-default c1 bg2-change' type="email" name="email" id="email" value={values.email} onChange={handleChange} required/>
                <br/>
                <br/>
                <label className='input-label c1'>Password</label>
                <input className='input-default c1 bg2-change' type="password" name="password" id="password" value={values.password} onChange={handleChange} required/>
                <br/>
                <br/>
                <input className='input-button' type="submit" name="login-submit" id="login-submit" value="Login"/>
                <br/>
                <br/>
                <div className='bottom-text c1'>Don't have an Account? <Link id="goToRegister" to="/register" className='bottom-button'>Create Account</Link></div>
                <br/>
                <div className='bottom-text c1'>You can also <Link id="goToRegister" to="/apply" className='bottom-button'>Apply as a Trainee</Link></div>
                <br/>
            </form>
        </div>
        </>  
    )
}