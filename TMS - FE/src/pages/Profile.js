import { useEffect, useState } from "react"
import { deleteProfileData, getProfileData } from "../api/authentication";
import ProfileEditView from "../components/ProfileEditView";
import ProfileView from "../components/ProfileView";
import { showNotification } from "../features/notification";
import store from "../redux/store";
import "./css/profile.css"
export default function Profile(props) {
    const currentUser = store.getState().auth.user;
    const isAdmin = store.getState().auth.user.isAdmin;
    // const isTrainer = store.getState().auth.user.isTrainer;
    // const isTrainee = store.getState().auth.user.isTrainee;
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(false);
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
    const toogleView = (e) => {
        fetchProfile();
        setEdit(!edit);
    };
    const deleteProfile = (e) =>{
        let params = (new URL(document.location)).searchParams;
	    let email = params.get("email");
        
        deleteProfileData(email)
        .then((response) => {
            console.log("response",response);

            if(response.status === 200) {
                showNotification(response.data.message, "success");
                window.location.reload();
            } else {
                showNotification("Failed to delete profile", "error");
            }
        })
        .catch((err) => {
            // console.log(err);
            if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
            else showNotification("Failed to delete profile", "error");
        })
    }
    const fetchProfile = () =>{
        let params = (new URL(document.location)).searchParams;
	    let email = params.get("email");
        getProfileData(email)
        .then((response) => {
            console.log("response",response);

            if(response.status === 200) {
                setError(false);
                setUser(response.data.user);
                // showNotification(response.data.message, "success");
            } else {
                showNotification("Failed to get profile", "error");
            }
        })
        .catch((err) => {
            if(err.response.status === 404) {
                setError(true);
            } else {
                // console.log(err);
                if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                else showNotification("Failed to get profile", "error");
            }
        })
    }
    useEffect(() =>{
        fetchProfile();
    }, []);
    return (
        <>
        {error ? (
            <>
            <div className='header-box fixed-center w3-animate-opacity bg2'>
                <div className='header-title c1'>This page isn't available</div>
                <div className='header-sub-title c2'>Invalid User Email: {(new URL(document.location)).searchParams.get("email")}</div>
                <div className='header-des c3'>The link you followed may be broken, or the page may have been removed.</div>
            </div>
            </>
        ) : (
            <>
            <div className="profile-box" style={{position: "relative"}}>
            {edit ? (
            <div className="closeBtn c3" id="close" onClick={toogleView}>
                <i className="fa fa-close"></i>
            </div>  
            ) : (
                <>
                {(isAdmin || (currentUser.email === user.email)) ? (
                    <>
                    <div className="editBtn edit-profile" id="edit" onClick={toogleView}>
                        Edit Profile
                    </div>
                    <div className="editBtn delete-profile" id="edit" onClick={deleteProfile}>
                        Delete Profile
                    </div>
                    </>
                ) : <></>}
                </>
            )}
            </div>
            
            {edit ? (
                <ProfileEditView user={user}/>
            ) : (
                <ProfileView user={user}/>
            )}
            </>
        )}
        <br/>
        <br/>
        </>
        
    )
}