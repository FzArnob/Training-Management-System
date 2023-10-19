import "./css/apply.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { traineeApplicationFormSubmit, uploadFile } from "../api/authentication";
import { showNotification } from "../features/notification";
export default function Apply(props) {
  const [genderOption, setgenderOption] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [resume, setResume] = useState(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
  });
  const [trainee, setTrainee] = useState({
    nidNo: "",
    experience: "",
    bloodGroup: "",
    institute: "",
    cgpa: ""
  });
  // console.log(values, trainee, profilePicture, resume);
  const handleSelect = (e) => {
    e.persist();
    setgenderOption(!genderOption);
    if (genderOption) {
      document.getElementById("gender-select-icon").className =
        "fa fa-chevron-down select-right-icon c2";
      document.getElementById("gender-select").style.border =
        "2px solid rgb(181, 181, 181)";
    } else {
      document.getElementById("gender-select-icon").className =
        "fa fa-chevron-up select-right-icon c-theme";
      document.getElementById("gender-select").style.border =
        "2px solid #007acc";
    }
  };
  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };
  const handleTraineeChange = (e) => {
    e.persist();
    setTrainee((trainee) => ({
      ...trainee,
      [e.target.name]: e.target.value,
    }));
  };
  const handleUpload = (e) => {
    e.persist();
    if (e.target.value !== "")
      document.getElementById("profilePicture-file").innerText = e.target.value;
    else
      document.getElementById("profilePicture-file").innerText = "Choose Image";
      setProfilePicture(e.target.files[0]);
  };
  const handleResumeUpload = (e) => {
    e.persist();
    if (e.target.value !== "")
      document.getElementById("resume-file").innerText = e.target.value;
    else
      document.getElementById("resume-file").innerText = "Choose File";
      setResume(e.target.files[0]);
  };
  const handleOption = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      gender: e.target.innerText,
    }));
    setgenderOption(!genderOption);
    document.getElementById("gender-select-icon").className =
      "fa fa-chevron-down select-right-icon c2";
    document.getElementById("gender-select").style.border =
      "2px solid rgb(181, 181, 181)";
    document.getElementById("gender-select").innerText = e.target.innerText;
    // console.log(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var validationError = false;
        if(profilePicture === "" || profilePicture === null) validationError = true;
        if(resume === "" || resume === null) validationError = true;
        for (const value in values) {
            if(values[value] === "" || values[value] === null) validationError = true; 
          }
        e.preventDefault();
        if(validationError) {
            // console.log(err);
            showNotification("Please fill up all the fields", "error");
        } else {
            var formData = new FormData();
            formData.append('file', profilePicture); 
            uploadFile(formData).then((responseP) => {
                console.log("up-response",responseP);
                if(responseP.status === 200) {
                  var formDataR = new FormData();
                  formDataR.append('file', resume); 

                  uploadFile(formDataR).then((responseR) => {
                      console.log("up-resume-response",responseR);
                      if(responseR.status === 200) {
                        var submitRequest = values;
                        submitRequest.profilePicture = "http://localhost:8080" + responseP.data.downloadUri;
                        submitRequest.trainee = trainee;
                        submitRequest.trainee.resume = "http://localhost:8080" + responseR.data.downloadUri;
                        console.log(JSON.stringify(submitRequest));
                        traineeApplicationFormSubmit(submitRequest)
                          .then((response) => {
                            console.log("response", response);
                            if (response.status === 200) {
                              showNotification(response.data.message, "success");
                              setTimeout(() => {
                                if (window.location.pathname !== "/login")
                                  window.location.assign("/login");
                              }, 3000);
                            }
                          })
                          .catch((err) => {
                            // console.log(err);
                        if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                        else showNotification("Failed to apply as trainee", "error");
                          });
                      }
                  }).catch((err) => {
                    // console.log(err);
                    if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                    else showNotification("Failed to upload Resume File", "error");
                  })
                }
            }).catch((err) => {
              // console.log(err);
              if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                    else showNotification("Failed to upload Profile Photo", "error");
            })
        }
    
  };
  return (
    <>
    <div className="backview" id="animatedBackground"></div>
    <div className="apply-box bg2-change">
        <div className="box-title c1">Trainee Application Form</div>
        <br />
        <br />
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="row">
                <div className="column-50">
                    <label className="input-label c1">Email</label>
                    <input className="input-default c1 bg2-change" type="email" name="email" id="email" value={values.email} onChange={handleChange} required />
                    <br />
                    <br />
                    <label className="input-label c1">First Name</label>
                    <input className="input-default c1 bg2-change" type="text" name="firstName" id="firstName" pattern="[A-Za-z\s.]{1,15}" title="Please insert not more than 15 characters only" value={values.firstName} onChange={handleChange} required />
                    <br />
                    <br />
                    <label className="input-label c1">Last Name</label>
                    <input className="input-default c1 bg2-change" type="text" name="lastName" id="lastName" pattern="[A-Za-z\s.]{1,15}" title="Please insert not more than 15 characters only" value={values.lastName} onChange={handleChange} required />
                    <br />
                    <br />
                    <label className="input-label c1">Address</label>
                    <input className="input-default c1 bg2-change" type="text" name="address" id="address" value={values.address} onChange={handleChange} required />
                    <br />
                    <br />
                    <label className="input-label c1">Date Of Birth</label>
                    <input className="input-default input-date c1 bg2-change" type="date" name="dateOfBirth" id="dateOfBirth" max="2004-12-31" value={values.dateOfBirth} onChange={handleChange} required />
                    <br />
                    <br />
                </div>
                <div className="space"></div>
                <div className="column-50">
                    <label className="select-label c1">Gender</label>
                    <div className="select-box">
                        <div className="select-default select-top-5 c1 bg2-change" id="gender-select" onClick={handleSelect}>
                            Select Gender
                        </div>
                        <i onClick={handleSelect} className="fa fa-chevron-down select-right-icon c2" id="gender-select-icon"></i>
                        {genderOption ? (
                        <div className="options-default c1 bg2-change">
                            <div className="option-default" onClick={handleOption}>
                                Male
                            </div>
                            <div className="option-default" onClick={handleOption}>
                                Female
                            </div>
                            <div className="option-default" onClick={handleOption}>
                                Other
                            </div>
                        </div>
                        ) : (
                        <></>
                        )}
                    </div>
                    <br />
                    <label className="input-label c1">Profile Photo</label>
                    <br />
                    <label className="custom-file-upload file-top-5 c3">
                        <input type="file" name="profilePicture" id="profilePicture" onChange={handleUpload} />
                        <i className="fa fa-cloud-upload"></i>
                        <span id="profilePicture-file"> Choose Image</span>
                    </label>
                    <br />
                    <br />
                    <label className="input-label c1">Phone</label>
                    <input className="input-default c1 bg2-change" type="text" name="phone" id="phone" pattern="[0-9]{10}" title="Please insert maximum 10 digits" value={values.phone} onChange={handleChange} required />
                    <br />
                    <br />
                    <label className="input-label c1">Password</label>
                    <input className="input-default c1 bg2-change" type="password" name="password" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" value={values.password} onChange={handleChange} required />
                    <br />
                    <br />
                    <label className="input-label c1">Confirm Password</label>
                    <input className="input-default c1 bg2-change" type="password" name="c_password" id="c_password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />
                    <br />
                    <br />
                </div>
            </div>

            <div className="box-title c1">Personal Information</div>
            <br />
            <div className="row">
                <div className="column-50">
                    <label className="input-label c1">NID No.</label>
                    <input className="input-default c1 bg2-change" type="text" name="nidNo" id="nidNo" pattern="[0-9]{1,20}" title="Please insert not more than 20 digits only" value={trainee.nidNo} onChange={handleTraineeChange} required />
                    <br />
                    <br />
                    <label className="input-label c1">Experience (years)</label>
                    <input className="input-default c1 bg2-change" type="text" name="experience" id="experience" pattern="[0-9]{1,2}" title="Please enter digits 1 to 99" value={trainee.experience} onChange={handleTraineeChange} required />
                    <br />
                    <br />
                    <label className="input-label c1">Blood Group</label>
                    <input className="input-default c1 bg2-change" type="text" name="bloodGroup" id="bloodGroup" pattern="^(A|B|AB|O)[+-]$" title="Formate: A+, B+, AB+, O+, A-, B-, AB-, O-" value={trainee.bloodGroup} onChange={handleTraineeChange} required />
                    <br />
                    <br />
                </div>
                <div className="space"></div>
                <div className="column-50">
                    <label className="input-label c1">Resume</label>
                    <br />
                    <label className="custom-file-upload file-top-5 c3">
                        <input type="file" name="resume" id="resume" onChange={handleResumeUpload}/>
                        <i className="fa fa-cloud-upload"></i>
                        <span id="resume-file"> Choose File</span>
                    </label>
                    <br />
                    <br />
                    <label className="input-label c1">Educational Institute</label>
                    <input className="input-default c1 bg2-change" type="text" name="institute" id="institute" pattern="[A-Za-z\s]{1,15}" title="Please insert not more than 15 characters only" value={trainee.institute} onChange={handleTraineeChange} required />
                    <br />
                    <br />
                    <label className="input-label c1">CGPA</label>
                    <input className="input-default c1 bg2-change" type="text" name="cgpa" id="cgpa" pattern="[0-9]+(\.[0-9]{1,2})" title="This must be a number with up to 2 decimal places" value={trainee.cgpa} onChange={handleTraineeChange} required />
                    <br />
                    <br />
                </div>
            </div>

            <br />
            <input className="input-button" type="submit" name="apply-submit" id="apply-submit" value="Submit Application" onChange={()=> {}}
            />
            <br />
            <br />
            <div className="bottom-text c1">
                Already have an Account?{" "}
                <Link to="/login" className="bottom-button">
                Login
                </Link>
            </div>
            <br />
        </form>
    </div>
</>
  );
}
