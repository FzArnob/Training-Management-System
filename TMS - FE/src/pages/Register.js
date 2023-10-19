import './css/register.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { uploadFile, userRegister } from '../api/authentication';
import { showNotification } from '../features/notification';
export default function Register(props){
    const [genderOption, setgenderOption] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [values, setValues] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        phone: ''
        });
    console.log(values);
    const handleSelect = (e) => {
        e.persist();
        setgenderOption(!genderOption);
        if(genderOption) {
            document.getElementById("gender-select-icon").className = "fa fa-chevron-down select-right-icon c2";
            document.getElementById("gender-select").style.border = "2px solid rgb(181, 181, 181)";
        } else {
            document.getElementById("gender-select-icon").className = "fa fa-chevron-up select-right-icon c-theme";
            document.getElementById("gender-select").style.border = "2px solid #007acc";
        }
        
    };
    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
        ...values,
        [e.target.name]: e.target.value
        }));
    };
    const handleUpload = (e) => {
        e.persist();
        if (e.target.value !== "") document.getElementById('profilePicture-file').innerText = e.target.value;
        else document.getElementById('profilePicture-file').innerText = "Choose Image";
        setProfilePicture(e.target.files[0]);
    };
    const handleOption = (e) => {
        e.persist();
        setValues(values => ({
        ...values,
        gender: e.target.innerText
        }));
        setgenderOption(!genderOption);
        document.getElementById("gender-select-icon").className = "fa fa-chevron-down select-right-icon c2";
        document.getElementById("gender-select").style.border = "2px solid rgb(181, 181, 181)";
        document.getElementById("gender-select").innerText = e.target.innerText;
        // console.log(e);
    };
    const handleSubmit = (e) => {
        var validationError = false;
        if(profilePicture === "" || profilePicture === null) validationError = true;
        for (const value in values) {
            if(values[value] === "" || values[value] === null) validationError = true; 
          }
        e.preventDefault();
        if(validationError) {
            showNotification("Please fill up all the fields", "error");
        } else {
            var formData = new FormData();
            formData.append('file', profilePicture); 
            uploadFile(formData).then((response) => {
                // console.log("up-response",response);
                if(response.status === 200) {
                    var registerRequest = values;
                    registerRequest.profilePicture = "http://localhost:8080" + response.data.downloadUri;
                    userRegister(registerRequest)
                    .then((response)=>{
                        console.log("register",response);
                        if(response.status === 200) {
                        showNotification(response.data.message, "success");
                        setTimeout(() => {
                            window.location.assign('/login');
                        }, 3000);
                        }
                        else showNotification("Failed to create account", "error");
                    }).catch((err) => {
                        // console.log(err);
                        if(err.response !== undefined) showNotification(err.response.data.message, "error");
                        else showNotification("Failed to create account", "error");
                    })
                }
            }).catch((err) => {
                // console.log(err);
                if(err.response !== undefined) showNotification(err.response.data.message, "error");
                else showNotification("Failed to upload profile photo.", "error");
            })
        }
        
      }
    return (
        <>
        <div className='backview' id="animatedBackground"></div>
        <div className='register-box bg2-change'>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='column-50'>
                        <label className='input-label c1'>Email</label>
                        <input className='input-default c1 bg2-change' type="email" name="email" id="email" value={values.email} onChange={handleChange} required/>
                        <br/>
                        <br/>
                        <label className='input-label c1'>First Name</label>
                        <input className='input-default c1 bg2-change' type="text" name="firstName" id="firstName" value={values.firstName} pattern="[A-Za-z]{1,15}" title="Please insert not more than 15 characters only" onChange={handleChange} required/>
                        <br/>
                        <br/>
                        <label className='input-label c1'>Last Name</label>
                        <input className='input-default c1 bg2-change' type="text" name="lastName" id="lastName" value={values.lastName} pattern="[A-Za-z]{1,15}" title="Please insert not more than 15 characters only" onChange={handleChange} required/>
                        <br/>
                        <br/>
                        <label className='input-label c1'>Address</label>
                        <input className='input-default c1 bg2-change' type="text" name="address" id="address" value={values.address} onChange={handleChange} required/>
                        <br/>
                        <br/>
                        <label className='input-label c1'>Date Of Birth</label>
                        <input className='input-default input-date c1 bg2-change' type="date" name="dateOfBirth" id="dateOfBirth" max="2004-12-31" value={values.dateOfBirth} onChange={handleChange} required/>
                        <br/>
                        <br/>
                        </div>
                        <div className='space'></div>
                        <div className='column-50'>
                        <label className='select-label c1'>Gender</label>
                        <div className='select-box'>
                        <div className='select-default select-top-5 c1 bg2-change' id='gender-select' onClick={handleSelect}>
                            Select Gender
                        </div>
                        <i onClick={handleSelect} className="fa fa-chevron-down select-right-icon c2" id="gender-select-icon"></i>
                        {genderOption ? (
                        <div className='options-default c1 bg2-change'>
                                <div className='option-default' onClick={handleOption}>Male</div>
                                <div className='option-default' onClick={handleOption}>Female</div>
                                <div className='option-default' onClick={handleOption}>Other</div>
                        </div>
                        
                        ) : <></>}
                        </div>
                        <br/>
                        <label className='input-label c1'>Profile Photo</label>
                        <br/>
                        <label className="custom-file-upload file-top-5 c3">
                            <input type="file" name="profilePicture" id="profilePicture" onChange={handleUpload}/>
                            <i className="fa fa-cloud-upload"></i><span id='profilePicture-file'> Choose Image</span>
                        </label>
                        <br/>
                        <br/>
                        <label className='input-label c1'>Phone (+880)</label>
                        <input className='input-default c1 bg2-change' type="text" name="phone" id="phone" pattern="[0-9]{10}" title="Please insert maximum 10 digits" value={values.phone} onChange={handleChange} required/>
                        <br/>
                        <br/>
                        <label className='input-label c1'>Password</label>
                        <input className='input-default c1 bg2-change' type="password" name="password" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" value={values.password} onChange={handleChange} required/>
                        <br/>
                        <br/>
                        <label className='input-label c1'>Confirm Password</label>
                        <input className='input-default c1 bg2-change' type="password" name="c_password" id="c_password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
                        <br/>
                        <br/>
                        </div>
                        </div>
                <br/>
                <input className='input-button' type="submit" name="register-submit" id="register-submit" value="Register" onChange={()=>{}}/>
                <br/>
                <br/>
                <div className='bottom-text c1'>Already have an Account? <Link to="/login" className='bottom-button'>Login</Link></div>
                <br/>
            </form>
        </div>
        </>  
    )
}