import { useEffect, useState } from "react"
import { updateProfile, uploadFile } from "../api/authentication";
import { showNotification } from "../features/notification";
import "./css/profileView.css"
export default function ProfileEditView(props) {
    const [genderOption, setgenderOption] = useState(false);
    const [user, setUser] = useState({
        email: "",
        address: "",
        dateOfBirth: "",
        firstName: "",
        gender: "",
        lastName: "",
        phone: null,
        profilePicture: "",
        role: [],
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [trainee, setTrainee] = useState({
        traineeEmail: "",
        nidNo: "",
        experience: "",
        bloodGroup: "",
        institute: "",
        cgpa: ""
      });
    const [trainer, setTrainer] = useState({
        trainerEmail: "",
        nidNo: "",
        experience: "",
        bloodGroup: "",
        expertise: ""
    });
    const [admin, setAdmin] = useState({
        adminEmail: "",
        designation: ""
        });
    // console.log(user, trainee, trainer, admin, profilePicture);
    useEffect(() =>{
        setUser({
            email: props.user.email,
            address: props.user.address,
            dateOfBirth: props.user.dateOfBirth,
            firstName: props.user.firstName,
            gender: props.user.gender,
            lastName: props.user.lastName,
            phone: props.user.phone,
            profilePicture: props.user.profilePicture,
            role: props.user.role,
        });
        setTrainee(props.user.trainee);
        setTrainer(props.user.trainer)
        setAdmin(props.user.admin)
    }, [props.user]);

    const handleTraineeChange = (e) => {
        e.persist();
        setTrainee((trainee) => ({
          ...trainee,
          [e.target.name]: e.target.value,
        }));
      };
    const handleTrainerChange = (e) => {
    e.persist();
    setTrainer((trainer) => ({
        name: e.target.value,
    }));
    };
    const handleAdminChange = (e) => {
    e.persist();
    setAdmin((admin) => ({
        ...admin,
        [e.target.name]: e.target.value,
    }));
    };
    const handleChange = (e) => {
        e.persist();
        setUser(user => ({
        ...user,
        [e.target.name]: e.target.value
        }));
    };
    const handleUpload = (e) => {
        e.persist();
        if (e.target.value !== "") {
            document.getElementById('photo-edit-icon').className = "fa fa-check-circle-o photo-edit-icon";
            document.getElementById('photo-edit').style.backgroundColor = "rgba(0, 122, 204,0.6)";

        }
        else document.getElementById('photo-edit-icon').className = "fa fa-pencil-square-o photo-edit-icon";
        setProfilePicture(e.target.files[0]);
    };
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
    const handleOption = (e) => {
        e.persist();
        setUser(user => ({
        ...user,
        gender: e.target.innerText
        }));
        setgenderOption(!genderOption);
        document.getElementById("gender-select-icon").className = "fa fa-chevron-down select-right-icon c2";
        document.getElementById("gender-select").style.border = "2px solid rgb(181, 181, 181)";
        document.getElementById("gender-select").innerText = e.target.innerText;
        // console.log(e);
    };
    
    const saveProfile = (submitRequest) => {
        updateProfile(submitRequest)
                .then((response) => {
                console.log("response", response);
                if (response.status === 200) {
                    showNotification(response.data.message, "success");
                } else {
                    showNotification("Failed to update profile", "error");
                }
                  
          }).catch((err) => {
            // console.log(err);
            if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
            else showNotification("Failed to update profile", "error");
          })
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        var submitRequest = user;
        submitRequest.trainee = trainee;
        submitRequest.trainer = trainer;
        submitRequest.admin = admin;
        console.log(JSON.stringify(submitRequest));
        if(profilePicture !== null) {
                var formData = new FormData();
                formData.append('file', profilePicture); 
                uploadFile(formData).then((responseP) => {
                    console.log("up-response",responseP);
                    if(responseP.status === 200) {
                        submitRequest.profilePicture = "http://localhost:8080" + responseP.data.downloadUri;
                        saveProfile(submitRequest);   
                    } else {
                        showNotification("Failed to upload Profile Photo", "error");
                    }
                }).catch((err) => {
                  // console.log(err);
                  if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                  else showNotification("Failed to upload Resume File", "error");
                })
            } else {
                saveProfile(submitRequest);
            }
            
        
      };
    return (
        <>
        <div className="profile-box">
            <form onSubmit={handleSubmit}>
            <div className="row full">
                <div className="column-50 w3-animate-top">
                    <div>
                    <div className="profile-photo photo-edit" id="photo-edit">
                        <label className="custom-file-upload border-less file-top-5 c3">
                                <input type="file" name="profilePicture" id="profilePicture" onChange={handleUpload}/>
                                <i className="fa fa-pencil-square-o photo-edit-icon" id="photo-edit-icon"></i><span id='profilePicture-file'></span>
                        </label>
                    </div>
                    <img alt="DP" className="profile-photo c1" src={user.profilePicture}/>
                    </div>
                </div>
                <div className="space"></div>
                <div className="column-50 w3-animate-top">
                <div className="profile-data mobile-center c2"><span className="bold">First Name: </span><input className='input-default c1 bg2-change' type="text" name="firstName" id="firstName" pattern="[A-Za-z\s.]{1,15}" title="Please insert not more than 15 characters only" value={user.firstName} onChange={handleChange} required/></div>
                <div className="profile-data mobile-center c2"><span className="bold">Last Name: </span><input className='input-default c1 bg2-change' type="text" name="lastName" id="lastName" pattern="[A-Za-z\s.]{1,15}" title="Please insert not more than 15 characters only" value={user.lastName} onChange={handleChange} required/></div>
                </div>
            </div>


            <div className="space"></div>
            <div className="row full">
                <div className="column-50 w3-animate-left">
                    <div className="profile-data mobile-center c2"><span className="bold">Address: </span><input className='input-default c1 bg2-change' type="text" name="address" id="address" value={user.address} onChange={handleChange} required/></div>
                    <div className="profile-data mobile-center c2"><span className="bold">Phone (+880): </span><input className='input-default c1 bg2-change' type="number" name="phone" id="phone" pattern="[0-9]{10}" title="Please insert maximum 10 digits" value={user.phone} onChange={handleChange} required/></div>
                </div>
                <div className="space"></div>
                <div className="column-50 w3-animate-right">
                    <div className="profile-data mobile-center c2"><span className="bold">Date of Birth: </span><input className="input-default input-date c1 bg2-change" type="date" name="dateOfBirth" id="dateOfBirth" max="2004-12-31" value={user.dateOfBirth} onChange={handleChange} required /></div>
                    <div className="profile-data mobile-center c2"><span className="bold">Gender: </span>
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
                    </div>                    
                </div>
            </div>


            {(props.user.trainee !== null) && (
            <>
            <div className="space"></div>
            <div className="row full">
                <div className="column-50 w3-animate-left">
                    <div className="profile-data mobile-center c2"><span className="bold">NID No: </span><input className='input-default c1 bg2-change' type="text" name="nidNo" id="nidNo" pattern="[0-9]{1,20}" title="Please insert not more than 20 digits only" value={trainee?.nidNo} onChange={handleTraineeChange} required/></div>
                    <div className="profile-data mobile-center c2"><span className="bold">Experience (years): </span><input className='input-default c1 bg2-change' type="text" name="experience" id="experience" pattern="[0-9]{1,2}" title="Please enter digits 1 to 99" value={trainee?.experience} onChange={handleTraineeChange} required/></div>
                    <div className="profile-data mobile-center c2"><span className="bold">Blood Group: </span><input className='input-default c1 bg2-change' type="text" name="bloodGroup" id="bloodGroup" pattern="^(A|B|AB|O)[+-]$" title="Formate: A+, B+, AB+, O+, A-, B-, AB-, O-" value={trainee?.bloodGroup} onChange={handleTraineeChange} required/></div>
                </div>
                <div className="space"></div>
                <div className="column-50 w3-animate-right">
                    <div className="profile-status-des mobile-center c3">{user.trainee?.applicationStatus?.statusDescription}</div>
                    <div className="profile-data mobile-center c2"><span className="bold">Last Institute of Study: </span><input className='input-default c1 bg2-change' type="text" name="institute" id="institute" value={trainee?.institute} onChange={handleTraineeChange} required/></div>
                    <div className="profile-data mobile-center c2"><span className="bold">CGPA: </span><input className='input-default c1 bg2-change' type="text" name="cgpa" id="cgpa" value={trainee?.cgpa} onChange={handleTraineeChange} required/></div>
                </div>
            </div>
            </>
            )}

            {(props.user.trainer !== null) && (
            <>
            <div className="space"></div>
            <div className="row full">
                <div className="column-50 w3-animate-bottom">
                    <div className="profile-data mobile-center c2"><span className="bold">NID No: </span><input className='input-default c1 bg2-change' type="text" name="nidNo" id="nidNo" pattern="[0-9]{1,20}" title="Please insert not more than 20 digits only" value={trainer?.nidNo} onChange={handleTrainerChange} required/></div>
                    <div className="profile-data mobile-center c2"><span className="bold">Experience (years): </span><input className='input-default c1 bg2-change' type="text" name="experience" id="experience" pattern="[0-9]{1,2}" title="Please enter digits 1 to 99" value={trainer?.experience} onChange={handleTrainerChange} required/></div>
                </div>
                <div className="space"></div>
                <div className="column-50 w3-animate-bottom">
                    <div className="profile-data mobile-center c2"><span className="bold">Blood Group: </span><input className='input-default c1 bg2-change' type="text" name="bloodGroup" id="bloodGroup" pattern="^(A|B|AB|O)[+-]$" title="Formate: A+, B+, AB+, O+, A-, B-, AB-, O-" value={trainer?.bloodGroup} onChange={handleTrainerChange} required/></div>
                    <div className="profile-data mobile-center c2"><span className="bold">Expertise: </span><input className='input-default c1 bg2-change' type="text" name="expertise" id="expertise" value={trainer?.expertise} onChange={handleTrainerChange} required/></div>
                </div>
            </div>
            </>
            )}

            {(props.user.admin !== null) && (
            <>
            <div className="space"></div>
            <div className="row full">
                <div className="column-50 w3-animate-bottom">
                    <div className="profile-data mobile-center c2"><span className="bold">Designation: </span><span className="bold">Expertise: </span><input className='input-default c1 bg2-change' type="text" name="designation" id="designation" value={admin?.designation} onChange={handleAdminChange} required/>{user.admin?.designation}</div>
                </div>
                <div className="space"></div>
                <div className="column-50 w3-animate-bottom">
                </div>
            </div>
            </>
            )}
            <br/>
            <br/>
                <input className='input-button w3-animate-bottom' type="submit" name="update-submit" id="update-submit" value="Save" onChange={()=>{}}/>
            </form>
        </div>
        </>
    )
}