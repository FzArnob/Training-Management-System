import { useEffect, useState } from 'react';
import { getDashboard } from '../api/authentication';
import { showNotification } from '../features/notification';
import store from '../redux/store';
import './css/dashboard.css'

export default function Dashboard() {
    // const currentUser = store.getState().auth.user;
    const isAdmin = store.getState().auth.user.isAdmin;
    const isTrainer = store.getState().auth.user.isTrainer;
    const isTrainee = store.getState().auth.user.isTrainee;
    const [data, setData] = useState({
        users: [],
        previousBatches: "",
        runningBatches: "",
        upcomingBatches: "",
        previousCourses: "",
        runningCourses: "",
        upcomingCourses: ""
    });
    const fetchData = () =>{
        getDashboard()
        .then((response) => {
            console.log("response",response);

            if(response.status === 200) {
                setData(response.data);
            } else {
                showNotification("Failed to get dashboard data", "error");
            }
        })
        .catch((err) => {
                // console.log(err);
                if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                else showNotification("Failed to get dashboard data", "error");
        })
    }
    const handleProfileClick = (email) => {
        window.location.assign('/profile?email='+email);
    };
    useEffect(() =>{
        fetchData();
    }, []);
 return (
    <>
    <br/>
    <div className='row dash-box'>
    <br/>
    {isAdmin || isTrainer ?
    <div align="center" className='w3-animate-left'>
        <div className="box-title c1">Statistics</div>
        <div className='dash-card c1 bg2'>
            <div className='stat-title c-theme'>Batches</div>
            <div className='stat-item c3'>Conducted: <span className='c1'>{data.previousBatches}</span></div>
            <div className='stat-item c3'>Running: <span className='c1'>{data.runningBatches}</span></div>
            <div className='stat-item c3'>Up Coming: <span className='c1'>{data.upcomingBatches}</span></div>
        </div>
        <div className='dash-card c1 bg2'>
            <div className='stat-title c-theme'>Courses</div>
            <div className='stat-item c3'>Previous: <span className='c1'>{data.previousCourses}</span></div>
            <div className='stat-item c3'>Running: <span className='c1'>{data.runningCourses}</span></div>
            <div className='stat-item c3'>Up Coming: <span className='c1'>{data.upcomingCourses}</span></div>
        </div>
    </div> : <></>}
    <br/>
    <div align="center" className='w3-animate-right'>
        <div className="box-title c1">Authorized Users</div>
        {data.users.map(user => {
            user.role.push({
                roleName: "TRAINER",
            })
            user.role.push({
                roleName: "ADMIN",
            })
             return (
                <div className='user-card bg2 c1' onClick={()=>{handleProfileClick(user.email)}}>
                    <div className='row'>
                        <img alt="DP" className="user-photo c1" src={user.profilePicture}/>
                        <div>
                            <div className='user-name c1'>{user.firstName+" "+user.lastName}</div>
                            <div className='user-email c3'>{user.email}</div>
                            <div className='user-roles row c2'>
                                {user.role.map(ro => {
                                    return (
                                        <div className='user-role'>{ro.roleName}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
    
    <br/>
    {isAdmin ? 
    <div align="center" className='w3-animate-left'>
        <div className="box-title c1">Applications</div>
        {data.users.map(user => {
            if(user.role.length === 0 && user.trainee !== null) { return (
                <div className='user-card bg2 c1' onClick={()=>{handleProfileClick(user.email)}}>
                    <div className='row'>
                        <img alt="DP" className="user-photo c1" src={user.profilePicture}/>
                        <div>
                            <div className='user-name c1'>{user.firstName+" "+user.lastName}</div>
                            <div className='user-email c3'>{user.email}</div>
                            <div className='user-role row c2'>{user.trainee.applicationStatus.statusName}</div>
                        </div>
                    </div>
                </div>
            ) } else {
                return (<></>);
            }
        })}
        <br/>
        <br/>
    </div> : <></>}
    </div>
    </>
 )
}