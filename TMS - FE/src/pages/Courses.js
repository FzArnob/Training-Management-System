import { useEffect, useState } from 'react';
import { addCourse, getCourses, updateCourse } from '../api/authentication';
import { showNotification } from '../features/notification';
import store from '../redux/store';
import './css/courses.css'

export default function Courses(props) {
    // const currentUser = store.getState().auth.user;
    const isAdmin = store.getState().auth.user.isAdmin;
    const isTrainer = store.getState().auth.user.isTrainer;
    const isTrainee = store.getState().auth.user.isTrainee;
    const [saveView, setSaveView] = useState({
        save: false,
        mode: ""
    });
    const [eCourse, setECourse] = useState({
        courseCode: "",
        name: "",
        description: "",
        status: ""
    });
    const [courseView, setCourseView] = useState([]);
    const [courses, setCourses] = useState([]);
    const [dbCourses, setDbCourses] = useState({
        previousCourses: [],
        runningCourses: [],
        upcomingCourses: []
    });
    const handleCourses = () => {
        var arr = [];
        if(document.getElementById('pCourses').checked === true) dbCourses.previousCourses.forEach(c => { arr.push(c) });
        if(document.getElementById('rCourses').checked === true) dbCourses.runningCourses.forEach(c => { arr.push(c) });
        if(document.getElementById('uCourses').checked === true) dbCourses.upcomingCourses.forEach(c => { arr.push(c) });
        setCourses(arr);
        setCourseView(searchFilter(arr));
        // console.log(arr);
    }
    // console.log("view", courseView);
    const handleChange = (e) => {
        e.persist();
        setECourse(course => ({
        ...course,
        [e.target.name]: e.target.value
        }));
    };
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        updateCourse(eCourse).then((response) => {
            console.log("response", response);
            if(response.status === 200){
            fetchCourses();
            showNotification(response.data.message, "success");
            }
        }).catch((err) => {
            // console.log(err);
            if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
            else showNotification("Failed to update course", "error");
        })
    };
    const handleAddSubmit = (e) => {
        e.preventDefault();
        addCourse(eCourse).then((response) => {
            console.log("response", response);
            if(response.status === 200){
            fetchCourses(); 
            showNotification(response.data.message, "success");
            }
        }).catch((err) => {
            // console.log(err);
            if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
            else showNotification("Failed to add course", "error");
        })
    };
    const handleSaveCourseClose = () => {
        setSaveView({
            save: false,
            mode: ""
        })
    }
    const handleSaveCourse = (course) => {
        if(course.target !== undefined) {
            setECourse({
                courseCode: "",
                name: "",
                description: "",
                status: ""
            });
            setSaveView({
                save: true,
                mode: "add"
            })
        } else {
            setECourse(course);
            setSaveView({
                save: true,
                mode: "edit"
            })
        }
        // console.log(course);
    }
    // console.log(eCourse);
    const searchFilter = (courses) => {
        var searchValue = document.getElementById("course-search").value;
        if(searchValue !== "") {
            // console.log("filter", courses[0].name);
            return courses.filter(course => (course?.name?.toLowerCase().includes(searchValue.toLowerCase()) || course?.courseCode?.toLowerCase().includes(searchValue.toLowerCase())));
        }
        return courses;
    }
const handleSearch = () => {
    setCourseView(searchFilter(courses))
}
const fetchCourses = () => {
    getCourses().then((response) => {
        console.log("response-refetch", response);
        if(response.status === 200){
            var result = {
                previousCourses: response.data.previousCourses,
                runningCourses: response.data.runningCourses,
                upcomingCourses: response.data.upcomingCourses
            };
            setDbCourses(result);
            var arr = [];
            if(document.getElementById('pCourses').checked === true) result.previousCourses.forEach(c => { arr.push(c) });
            if(document.getElementById('rCourses').checked === true) result.runningCourses.forEach(c => { arr.push(c) });
            if(document.getElementById('uCourses').checked === true) result.upcomingCourses.forEach(c => { arr.push(c) });
            setCourses(arr);
            setCourseView(searchFilter(arr));
        }
    }).catch((err) => {
        // console.log(err);
        if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
        else showNotification("Failed to get courses", "error");
    })
}
    useEffect(()=>{
        getCourses().then((response) => {
            console.log("response", response);
            if(response.status === 200){
                var result = {
                    previousCourses: response.data.previousCourses,
                    runningCourses: response.data.runningCourses,
                    upcomingCourses: response.data.upcomingCourses
                };
                setDbCourses(result);
                document.getElementById("rCourses").checked = true;
                setCourses(response.data.runningCourses);
                setCourseView(searchFilter(response.data.runningCourses));
            }
        }).catch((err) => {
            // console.log(err);
            if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
            else showNotification("Failed to get courses", "error");
        })
    }, [])
    return (
        <>
        {(isAdmin || isTrainer || isTrainee) ? (
        <>
        <div className='courses-box'>
            <div className='row full'>
                <div align="left" className='column-50  w3-animate-left'>
                <input className='input-default c1 bg1' type="text" name="course" id="course-search" onChange={handleSearch} placeholder='Search course name or code'/>
                </div>
                {isAdmin ? <>
                <div className='space'></div>
                <div align="right" className='column-50  w3-animate-right'>
                <div className='add-btn c2 max-300' onClick={handleSaveCourse}><i className="fa fa-plus"></i> Add a Course</div>
                </div>
                </> : <></>}
            </div>
            <div className='row full'>
            <form className='course-status'>
                {(isAdmin || isTrainer) ? <label className="checkbox-inline c2">
                <input type="checkbox" id="pCourses" onChange={handleCourses} value=""/>Previous Courses
                </label> : <></>}
                <label className="checkbox-inline c2">
                <input type="checkbox" id="rCourses" onChange={handleCourses} value=""/>Running Courses
                </label>
                <label className="checkbox-inline c2">
                <input type="checkbox" id="uCourses" onChange={handleCourses} value=""/>Up Coming Courses
                </label>
            </form>
            </div>
            <div className='full cen w3-animate-bottom'>
                {courseView.map((course) => {
                    return (
                        <div key={course.courseCode} className='course-card bg2 course-column-50'>
                    <div className='row-2 full'>
                    <div className='course-status-tag c1'>{course.status}</div>

                        <div align="right" className='row c-right full-20'>
                            <div className='course-code bg1 c-theme'>{course.courseCode}</div>
                            {isAdmin ? <div className='editBtn bg-theme edit-course' onClick={() => {handleSaveCourse(course)}}>Edit</div> : <></>}
                        </div>
                    </div>
                    <div className='course-name c1'>{course.name}</div>
                    <div className='course-des c3'>{course.description}</div>
                </div>
                    )
                })}
            </div>
            </div>

            {saveView.save ? (
            <div >
                <div className="modal-void" onClick={handleSaveCourseClose}></div>
                <div className="fixed-center bg2 c1 modal-box">
                    <div className="closeBtn modal-close c3" id="close" onClick={handleSaveCourseClose}><i className="fa fa-close"></i></div>
                    <br/>
                    <br/>
                    {(saveView.mode === "add") ? (
                        <>
                        <form onSubmit={handleAddSubmit}>
                        <div className="modal-inner">
                        <input className='input-default c1 bg2-change' type="text" name="courseCode" id="courseCode" value={eCourse.courseCode} onChange={handleChange} placeholder="Course Code" required/>
                        <br/>
                        <br/>
                        <input className='input-default c1 bg2-change' type="text" name="name" id="name" pattern="[A-Za-z\s.]{1,40}" title="Please insert not more than 40 characters only" value={eCourse.name} onChange={handleChange} placeholder="Name" required/>
                        <br/>
                        <br/>
                        <input className='input-default c1 bg2-change' type="text" name="description" id="description" value={eCourse.description} onChange={handleChange} placeholder="Description" required/>
                        <br/>
                        <br/>
                        <input className='input-default c1 bg2-change' type="text" name="status" id="status" pattern="(previous|running|upcoming)" title="Please enter exactly previous or running or upcoming" value={eCourse.status} onChange={handleChange} placeholder="Status" required/>
                        </div>
                        <br/>
                        <input className='input-button' type="submit" name="add-submit" id="add-submit" value="Add Course" onChange={()=>{}}/>
                        </form>
                        </>
                    ) : <></>}
                    {(saveView.mode === "edit") ? (
                        <>
                        <form onSubmit={handleUpdateSubmit}>
                        <div className="modal-inner">
                        <input className='input-default c1 bg2-change' type="text" name="name" id="name" pattern="[A-Za-z\s.]{1,40}" title="Please insert not more than 40 characters only" value={eCourse.name} onChange={handleChange} placeholder="Name" required/>
                        <br/>
                        <br/>
                        <input className='input-default c1 bg2-change' type="text" name="description" id="description" value={eCourse.description} onChange={handleChange} placeholder="Description" required/>
                        <br/>
                        <br/>
                        <input className='input-default c1 bg2-change' type="text" name="status" id="status" pattern="(previous|running|upcoming)" title="Please enter exactly previous or running or upcoming" value={eCourse.status} onChange={handleChange} placeholder="Status" required/>
                        </div>
                        <br/>
                        <input className='input-button' type="submit" name="update-submit" id="update-submit" value="Save Course" onChange={()=>{}}/>
                        </form>
                        </>
                    ) : <></>}
                </div>          
            </div>
        ) : <></>}
        </>) : 
        <>
        <div className='header-box fixed-center w3-animate-opacity bg2'>
            <div className='header-title c1'>This page isn't available</div>
            <div className='header-sub-title c2'>You do not have a role !</div>
            <div className='header-des c3'>Please wait for Admin's approval.</div>
        </div>
        </>
         }
        </>  
    )
    
}