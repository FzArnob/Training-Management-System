import { useEffect, useState } from "react"
import { assignRole, removeRole, updateApplicationStatus } from "../api/authentication";
import store from "../redux/store";
import "./css/profileView.css"
export default function ProfileView(props) {
    // const currentUser = store.getState().auth.user;
    const isAdmin = store.getState().auth.user.isAdmin;
    const isTrainer = store.getState().auth.user.isTrainer;
    // const isTrainee = store.getState().auth.user.isTrainee;
    const [roleView, setRoleView] = useState(false);
    const [statusView, setStatusView] = useState(false);
    const [user, setUser] = useState({
        address: "",
        admin: null,
        dateOfBirth: "",
        email: "",
        firstName: "",
        gender: "",
        lastName: "",
        password: null,
        phone: null,
        profilePicture: "",
        role: [],
        trainee: null,
        trainer: null
    });
    const toogleRole = () => {
        setRoleView(!roleView);
    }
    const toogleStatus = () => {
        setStatusView(!statusView);
    }
    useEffect(() =>{
        setUser(props.user);
        
    }, [props.user]);

    const handleAddRole = (e) => {
        assignRole({
            email: props.user.email,
            roleName: e.target.innerText
        }).then((response) => {
            console.log("role-add:", response);
            if(response.status === 200) window.location.reload();
        }).catch((err) => {

        })
    };
    const handleEditStatus = (e) => {
        updateApplicationStatus({
            email: props.user.email,
            statusName: e.target.innerText
        }).then((response) => {
            console.log("status-change:", response);
            if(response.status === 200) window.location.reload();
        }).catch((err) => {

        })
    };
    const handleRemoveRole = (roleName) => {
        removeRole({
            email: props.user.email,
            roleName: roleName
        }).then((response) => {
            console.log("role-remove:", response);
            if(response.status === 200) window.location.reload();
        }).catch((err) => {

        })
    }


    return (
        <div>
        <div className="profile-box">
            <div className="row full">
                <div className="column-50 w3-animate-opacity">
                    <img alt="DP" className="profile-photo c1" src={user.profilePicture}/>
                </div>
                <div className="space"></div>
                <div className="column-50 w3-animate-opacity">
                    <div className="profile-fullname mobile-center c1">{user.firstName + " " + user.lastName}</div>
                    <div className="profile-email mobile-center c3">{user.email}</div>
                    <div className="profile-roles mobile-center c2">Roles {isAdmin ? <i className="add-role fa fa-plus-square-o" onClick={toogleRole}></i> : <></>}</div>
                    {(user.role.length === 0) ? (
                        <div className="profile-no-role mobile-center c3">User does not have any Roles yet</div>
                    ) : (
                    <>
                    <div className="row-role full">
                    {user.role.map((role) => {
                            return (
                                <>
                                <label key={role.roleName} className="profile-role c-theme bg2" onClick={() => {handleRemoveRole(role?.roleName)}}>{role?.roleName} {isAdmin ? <i className="fa fa-times remove-role"></i> : <></>}</label>
                                </>
                            )
                            })}
                    </div>
                    </>
                    )}
                </div>
            </div>


            <div className="space"></div>
            <div className="row full">
                <div className="column-50 w3-animate-left">
                    <div className="profile-data mobile-center c2"><span className="bold">Address: </span>{user.address}</div>
                    <div className="profile-data mobile-center c2"><span className="bold">Phone: +880</span>{user.phone}</div>
                </div>
                <div className="space"></div>
                <div className="column-50 w3-animate-right">
                    <div className="profile-data mobile-center c2"><span className="bold">Date of Birth: </span>{user.dateOfBirth}</div>
                    <div className="profile-data mobile-center c2"><span className="bold">Gender: </span>{user.gender}</div>                    
                </div>
            </div>


            {(user.trainee !== null) && (
            <>
            <div className="space"></div>
            <div className="row full">
                <div className="column-50 w3-animate-bottom">
                    <div className="profile-data mobile-center c2"><span className="bold">NID No: </span>{user.trainee?.nidNo}</div>
                    <div className="profile-data mobile-center c2"><span className="bold">Experience (years): </span>{user.trainee?.experience}</div>
                    <div className="profile-data mobile-center c2"><span className="bold">Blood Group: </span>{user.trainee?.bloodGroup}</div>
                    {(isAdmin || isTrainer) ? <div className="profile-resume bg2 c-theme"><a className="c-theme" href={user.trainee?.resume} rel="noopener noreferrer" target="_blank">Resume <i className="fa fa-cloud-download"></i></a></div> : <></>}
                </div>
                <div className="space"></div>
                <div className="column-50 w3-animate-bottom">
                    <div className="profile-status mobile-center c2">Application Status <div className="profile-status-name">{user.trainee?.applicationStatus?.statusName} {isAdmin ? <i className="add-status fa fa-pencil-square-o" onClick={toogleStatus}></i> : <></>}</div></div>
                    <div className="profile-status-des mobile-center c3">{user.trainee?.applicationStatus?.statusDescription}</div>
                    <div className="profile-data mobile-center c2"><span className="bold">Last Institute of Study: </span>{user.trainee?.institute}</div>
                    <div className="profile-data mobile-center c2"><span className="bold">CGPA: </span>{user.trainee?.cgpa}</div>
                </div>
            </div>
            </>
            )}

            {(user.trainer !== null) && (
            <>
            <div className="space"></div>
            <div className="row full">
                <div className="column-50 w3-animate-bottom">
                    <div className="profile-data mobile-center c2"><span className="bold">NID No: </span>{user.trainer?.nidNo}</div>
                    <div className="profile-data mobile-center c2"><span className="bold">Experience (years): </span>{user.trainer?.experience}</div>
                </div>
                <div className="space"></div>
                <div className="column-50 w3-animate-bottom">
                    <div className="profile-data mobile-center c2"><span className="bold">Blood Group: </span>{user.trainer?.bloodGroup}</div>
                    <div className="profile-data mobile-center c2"><span className="bold">Expertise: </span>{user.trainer?.expertise}</div>
                </div>
            </div>
            </>
            )}

            {(user.admin !== null) && (
            <>
            <div className="space"></div>
            <div className="row full">
                <div className="column-50 w3-animate-bottom">
                    <div className="profile-data mobile-center c2"><span className="bold">Designation: </span>{user.admin?.designation}</div>
                </div>
                <div className="space"></div>
                <div className="column-50">
                </div>
            </div>
            </>
            )}
        </div>
        {roleView ? (
            <div className="w3-animate-opacity">
                <div className="modal-void" onClick={toogleRole}></div>
                <div className="fixed-center bg2 c1 modal-box">
                    <div className="closeBtn modal-close c3" id="close" onClick={toogleRole}><i className="fa fa-close"></i></div>
                    <br/>
                    <br/>
                    <div className="modal-add-option" onClick={handleAddRole}>ADMIN</div>
                    <div className="modal-add-option" onClick={handleAddRole}>TRAINER</div>
                    <div className="modal-add-option" onClick={handleAddRole}>TRAINEE</div>
                </div>          
            </div>
        ) : <></>}

        {statusView ? (
            <div className="w3-animate-opacity">
                <div className="modal-void" onClick={toogleStatus}></div>
                <div className="fixed-center bg2 c1 modal-box">
                    <div className="closeBtn modal-close c3" id="close" onClick={toogleStatus}><i className="fa fa-close"></i></div>
                    <br/>
                    <br/>
                    <div className="modal-add-option" onClick={handleEditStatus}>APPLIED</div>
                    <div className="modal-add-option" onClick={handleEditStatus}>EXAM</div>
                    <div className="modal-add-option" onClick={handleEditStatus}>INTERVIEW</div>
                    <div className="modal-add-option" onClick={handleEditStatus}>HR INTERVIEW</div>
                    <div className="modal-add-option" onClick={handleEditStatus}>ON BOARD</div>
                    <div className="modal-add-option" onClick={handleEditStatus}>TRAINEE</div>
                </div>          
            </div>
        ) : <></>}
        </div>
    )
}