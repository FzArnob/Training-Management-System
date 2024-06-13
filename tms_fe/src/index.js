import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getCurrentUser, getToken, userLogout } from './api/authentication';
import store from './redux/store';
import { authSuccess } from './redux/actions';
import { BrowserRouter } from 'react-router-dom';
import { getCookie } from './cookies/cookieHandler';
const checkRole = (roles, roleName) => {
  return roles.some(role => (role.roleName === roleName))
}
if(getToken() !== ""){
  getCurrentUser().then((response) => {
    if(response.status === 200){
      var user = response.data.user;
      user.isAdmin = checkRole(user.role, "ADMIN");
      user.isTrainer = checkRole(user.role, "TRAINER");
      user.isTrainee = checkRole(user.role, "TRAINEE");
      store.dispatch(authSuccess(user));
      // console.log(store.getState().auth);
  }
  }).catch((err) => {
    userLogout();
    if(window.location.pathname !== '/login') window.location.assign('/login');
  })
}
//create components using React.lazy
const LightTheme = React.lazy(() => import('./themes/LightTheme'));
const DarkTheme = React.lazy(() => import('./themes/DarkTheme'));


const ThemeSelector = ({ children }) => {
  const CHOSEN_THEME = getCookie('theme');
  return (
    <>
      <React.Suspense fallback={<></>}>
        {(CHOSEN_THEME === "light") && <LightTheme />}
        {(CHOSEN_THEME === "dark") && <DarkTheme />}
        {(CHOSEN_THEME === "") && <DarkTheme />}
      </React.Suspense>
      {children}
    </>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <ThemeSelector>
        <App/>
        <div className='notification-box' id='notification-box'></div>
      </ThemeSelector>
    </BrowserRouter>
  // </React.StrictMode>
);
reportWebVitals();
