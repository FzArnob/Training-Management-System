import { useEffect, useState } from "react"
import { addAssignmentAnswer, addScheduleAssignment, addScheduleToBatch, addTraineeToBatch, evaluationAnswer, getBatchData, removeAssignment, removeScheduleFromBatch, removeTraineeFromBatch, uploadFile } from "../api/authentication";
import { showNotification } from "../features/notification";
import store from "../redux/store";
import "./css/batch.css"
export default function Batch(props) {
    const currentUser = store.getState().auth.user;
    const isAdmin = store.getState().auth.user.isAdmin;
    const isTrainer = store.getState().auth.user.isTrainer;
    const isTrainee = store.getState().auth.user.isTrainee;
    const [traineeAddView, setTraineeAddView] = useState(false);
    const [assAddView, setAssAddView] = useState(false); 
    const [ansAddView, setAnsAddView] = useState(false); 
    const [scheduleAddView, setScheduleAddView] = useState(false);
    const [error, setError] = useState(false);
    const [assignmentFile, setAssignmentFile] = useState(null);
    const [answerFile, setAnswerFile] = useState(null);
    const [evaluation, setEvaluation] = useState("");
    const [addTrainee, setAddTrainee] = useState({
        email: "",
        batchCode: ""
    });
    const [batch, setBatch] = useState({
        batchCode: "",
        description: "",
        endDate: "",
        name: "",
        schedules: [],
        startDate: "",
        trainees: []
    });
    const [schedule, setSchedule] = useState({
        startDate: "",
        endDate: "",
        scheduleStartTime: "",
        scheduleEndTime: "",
        courseCode: "",
        trainerEmail: "",
        batchCode: ""
    });
    const handleAssUpload = (e) => {
        e.persist();
        if (e.target.value !== "") document.getElementById('assignmentFile-file').innerText = " "+e.target.value;
        else document.getElementById('assignmentFile-file').innerText = " Choose Image";
        setAssignmentFile(e.target.files[0]);
    };
    const handleAnswerUpload = (e) => {
        e.persist();
        if (e.target.value !== "") document.getElementById('answerFile-file').innerText = " "+e.target.value;
        else document.getElementById('answerFile-file').innerText = " Choose Image";
        setAnswerFile(e.target.files[0]);
    };
    const [ass, setAss] = useState({
        question: "",
        assignmentFile: "",
        time: ""
    });
    const [answer, setAnswer] = useState({
        answer: "",
        answerFile: "",
        traineeEmail: ""
    });
    const [assSchedule, setAssSchedule] = useState(null);
    const [assignmentIdAnswer, setAssignmentIdAnswer] = useState(null);
    const handleAddTrainee = (e) => {
        setAddTrainee({
            email: e.target.value,
            batchCode: batch.batchCode
        })
    }
    const formatAMPM = (time) => {
        var hours = time.split(':');
        // console.log(hours);
        var ampm = hours[0] >= 12 ? 'PM' : 'AM';
        hours[0] = hours[0] % 12;
        hours[0] = hours[0] ? hours[0] : 12; // the hour '0' should be '12'
        hours[1] = hours[1] < 10 ? '0' + hours[1] : hours[1];
        var time12 = hours[0] + ':' + hours[1] + ' ' + ampm;
        return time12;
    }
    const handleAddAssSubmit = (e) => {
        e.preventDefault();
        var validationError = false;
        if(assignmentFile === "" || assignmentFile === null) validationError = true;
        if(validationError) {
            showNotification("Please fill up all the fields", "error");
        } else {
            var formData = new FormData();
            formData.append('file', assignmentFile); 
            uploadFile(formData).then((response) => {
                console.log("up-response",response);
                if(response.status === 200) {
                    var assRequest = {};
                    assRequest.assignment = ass;
                    assRequest.assignment.assignmentFile = "http://localhost:8080" + response.data.downloadUri;
                    assRequest.schedule = assSchedule;
                    addScheduleAssignment(assRequest)
                        .then((response) => {
                        console.log("response",response);

                        if(response.status === 200) {
                            setBatch(response.data.batch);
                            showNotification(response.data.message, "success");
                        } else {
                            showNotification("Failed to add Assignment", "error");
                        }
                    })
                    .catch((err) => {
                            // console.log(err);
                            if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                            else showNotification("Failed to add Assignment", "error");
                    })
                } else showNotification("Failed to upload attachment file", "error");
            }).catch((err) => {
                // console.log(err);
                if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                else showNotification("Failed to upload attachment file", "error");
            })
        }
        
      }
      const handleAddAnswerSubmit = (e) => {
        e.preventDefault();
        var validationError = false;
        if(answerFile === "" || answerFile === null) validationError = true;
        if(validationError) {
            showNotification("Please fill up all the fields", "error");
        } else {
            var formData = new FormData();
            formData.append('file', answerFile); 
            uploadFile(formData).then((response) => {
                console.log("up-response",response);
                if(response.status === 200) {
                    var assRequest = {};
                    assRequest.answer = answer;
                    assRequest.answer.answerFile = "http://localhost:8080" + response.data.downloadUri;
                    assRequest.answer.traineeEmail = currentUser.email;
                    assRequest.assignmentId = assignmentIdAnswer;
                    assRequest.batchCode = batch.batchCode;
                    addAssignmentAnswer(assRequest)
                        .then((response) => {
                        console.log("response",response);

                        if(response.status === 200) {
                            setBatch(response.data.batch);
                            showNotification(response.data.message, "success");
                            toogleAddAnswerView(null);
                        } else {
                            showNotification("Failed to add Answer", "error");
                        }
                    })
                    .catch((err) => {
                            // console.log(err);
                            if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                            else showNotification("Failed to add Answer", "error");
                    })
                } else showNotification("Failed to upload attachment file", "error");
            }).catch((err) => {
                // console.log(err);
                if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                else showNotification("Failed to upload attachment file", "error");
            })
        }
        
      }
    const handleRemoveTraineeFromBatch = (email) => {
            removeTraineeFromBatch({
                email: email,
                batchCode: batch.batchCode
            })
            .then((response) => {
            console.log("response",response);

            if(response.status === 200) {
                setBatch(response.data.batch);
                showNotification(response.data.message, "success");
            } else {
                showNotification("Failed to remove Trainee", "error");
            }
        })
        .catch((err) => {
                // console.log(err);
                if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                else showNotification("Failed to remove Trainee", "error");
        })
    }
    const handleRemoveAssignment = (scheduleId, assignmentId) => {
        removeAssignment({
            scheduleId: scheduleId,
            assignmentId: assignmentId
        })
        .then((response) => {
        console.log("response",response);

        if(response.status === 200) {
            setBatch(response.data.batch);
            showNotification(response.data.message, "success");
        } else {
            showNotification("Failed to remove Assignment", "error");
        }
    })
    .catch((err) => {
            // console.log(err);
            if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
            else showNotification("Failed to remove Assignment", "error");
    })
}
const handleEvaluation = (e) => {
    setEvaluation(e.target.value)
}
    const handleRemoveScheduleFromBatch = (scheduleId) => {
            removeScheduleFromBatch({
                scheduleId: scheduleId,
                batchCode: batch.batchCode
            })
            .then((response) => {
            console.log("response",response);

            if(response.status === 200) {
                setBatch(response.data.batch);
                showNotification(response.data.message, "success");
            } else {
                showNotification("Failed to remove Schedule", "error");
            }
        })
        .catch((err) => {
                // console.log(err);
                if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                else showNotification("Failed to remove Schedule", "error");
        })
    }
    const handleAddTraineeSubmit = (e) => {
        e.preventDefault();
            addTraineeToBatch(addTrainee)
            .then((response) => {
            console.log("response",response);

            if(response.status === 200) {
                setBatch(response.data.batch);
                showNotification(response.data.message, "success");
            } else {
                showNotification("Failed to add Trainee", "error");
            }
        })
        .catch((err) => {
                // console.log(err);
                if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                else showNotification("Failed to add Trainee", "error");
        })
    }
    const handleEvaluate = (answerId) => {
            evaluationAnswer({
                answerId: answerId,
                evaluation: evaluation,
                batchCode: batch.batchCode
            })
            .then((response) => {
            console.log("response",response);

            if(response.status === 200) {
                setBatch(response.data.batch);
                showNotification(response.data.message, "success");
            } else {
                showNotification("Failed to evaluate answer", "error");
            }
        })
        .catch((err) => {
                // console.log(err);
                if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                else showNotification("Failed to evaluate answer", "error");
        })
    }
    const handleAddScheduleSubmit = (e) => {
        e.preventDefault();
        var scheduleRequest = schedule;
        scheduleRequest.batchCode = batch.batchCode;
        console.log(scheduleRequest);
            addScheduleToBatch(scheduleRequest)
            .then((response) => {
            console.log("response",response);

            if(response.status === 200) {
                setBatch(response.data.batch);
                showNotification(response.data.message, "success");
            } else {
                showNotification("Failed to add Schedule", "error");
            }
        })
        .catch((err) => {
                // console.log(err);
                if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                else showNotification("Failed to add Schedule", "error");
        })
    }
    const daysPointer = new Array(30);
    daysPointer.forEach((day, index) => daysPointer[index] = index);
    const handleAddSchedule = (e) => {
        e.persist();
        setSchedule(schedule => ({
        ...schedule,
        [e.target.name]: e.target.value
        }));
    };
    const getScore = (answers) => {
        var answer = answers.filter(answer => answer.traineeEmail === currentUser.email);
        return answer[0].evaluation;
    }
    const compareDateTime = (time) => {
        var date1Updated = new Date(time);  
        var currdt = new Date();
        return date1Updated > currdt;
    }
    const handleAddAss = (e) => {
        e.persist();
        setAss(ass => ({
        ...ass,
        [e.target.name]: e.target.value
        }));
    };
    const handleAddAnswer = (e) => {
        e.persist();
        setAnswer(answer => ({
        ...answer,
        [e.target.name]: e.target.value
        }));
    };
    const toogleAddTrainee = () => {
        setTraineeAddView(!traineeAddView);
    }
    const toogleAddSchedule = () => {
        setScheduleAddView(!scheduleAddView);
    }
    const toogleAddAssView = (sId) => {
        setAssSchedule(sId);
        setAssAddView(!assAddView);
    }
    const toogleAddAnswerView = (assignmentId) => {
        setAssignmentIdAnswer(assignmentId);
        setAnsAddView(!ansAddView);
    }
    const fetchBatch = () =>{
        let params = (new URL(document.location)).searchParams;
	    let batchCode = params.get("batchCode");
        getBatchData(batchCode)
        .then((response) => {
            console.log("response",response);

            if(response.status === 200) {
                setError(false);
                setBatch(response.data.batch);
                // showNotification(response.data.message, "success");
            } else {
                showNotification("Failed to get Batch", "error");
            }
        })
        .catch((err) => {
                setError(true);
                // console.log(err);
                if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
                else showNotification("Failed to get Batch", "error");
        })
    }
    useEffect(() =>{
        fetchBatch();
    }, []);
    return (
        <>
        {error ? (
            <>
            <div className='header-box fixed-center w3-animate-opacity bg2'>
                <div className='header-title c1'>This page isn't available</div>
                <div className='header-sub-title c2'>Invalid Batch: {(new URL(document.location)).searchParams.get("batchCode")}</div>
                <div className='header-des c3'>The link you followed is unauthorized, or the page may have been removed.</div>
            </div>
            </>
        ) : (
            <div>
                <div className="page-header">
                    <div className="page-header-back"></div>
                    <div className='header-box w3-animate-top'>
                        <div className='header-title c1'>{batch.batchCode}</div>
                        <div className='header-sub-title c2'>{batch.name}</div>
                        <div className='header-des c3'>{batch.description}</div>
                    </div>
                </div>
                {/* <div className="row full"> */}
                <div>
                    <div align="center"><span className="box-title c1 w3-animate-left">All Trainees</span> {isAdmin ? <i className="add-trainee fa fa-plus-square-o" onClick={toogleAddTrainee}></i> : <></>}</div>
                    <br/>
                    <div className="trainees-box w3-animate-right">
                        {batch.trainees.map((email) => {
                            return (
                                <div className="trainees-card bg2 c1"><a className="link c3" href={"/profile?email="+email}>{email}</a> {isAdmin ? <i className="fa fa-times remove-trainee c1" onClick={()=>{handleRemoveTraineeFromBatch(email)}}></i> : <></>}</div>
                            )
                        })}
                    </div>
                </div>
                <div>
                <div align="center"><span className="box-title c1 w3-animate-left">Course Schedules</span> {isAdmin ? <i className="add-trainee fa fa-plus-square-o" onClick={toogleAddSchedule}></i> : <></>}</div>
                <div className="schedule-box">
                <div className="routine full">
                                    <div className="row">
                                        <div className="routine-days-axis">
                                            {daysPointer.map((value) => {
                                                return (
                                                <div className="routine-days-pointer c1" id={"day-pointer-"+value}>Day {value}</div>
                                                )})} 
                                        </div>
                                    </div>
                                    <div className="row"></div>
                                 </div>
                    {batch.schedules.map((schedule) => {
                        return (
                            <div className="couse-schedule-box bg1 c1 w3-animate-bottom">
                                <br/>

                                {isAdmin ? 
                                <i className="fa fa-times remove-schedule c1" onClick={()=>{handleRemoveScheduleFromBatch(schedule.scheduleId)}}></i>
                                 : <></>}
                                 
                                 <div className="course-view">
                                 <table>
                                    <thead>
                                    <tr>
                                        <th>Course Code</th>
                                        <th>Schedule Date</th>
                                        <th>Class Time</th>
                                        <th>Trainer</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{schedule.courseCode}</td>
                                        <td>
                                            <div>From: {schedule.startDate}</div>
                                            <div>To: {schedule.endDate}</div>
                                        </td>
                                        <td>
                                            <div>From: {formatAMPM(schedule.scheduleStartTime)}</div>
                                            <div>To: {formatAMPM(schedule.scheduleEndTime)}</div>
                                        </td>
                                        <td>
                                            <a className="link" href={"/profile?email="+schedule.trainerEmail}> {schedule.trainerEmail}</a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>
                                {(isTrainer && schedule.trainerEmail === currentUser.email) ? 
                                <div className="batchBtn bg-theme add-ass" onClick={()=>{toogleAddAssView(schedule.scheduleId)}}>Add Assignment</div> : <></>}
                                <div className="row hmap">
                                {schedule.assignments?.map((assignment) => {
                                    return (
                                        <div className="schedule-card bg2 c1">
                                            <br/>
                                            {(isTrainer && schedule.trainerEmail === currentUser.email) ? <i className="fa fa-times remove-schedule c1" onClick={()=>{handleRemoveAssignment(schedule.scheduleId, assignment.assignmentId)}}></i> : <></>}
                                            <div>{assignment.question}</div>
                                            <div>Deadline: <span>{formatAMPM(assignment.time)}</span></div>
                                            <div className="assignment-attachment bg2 c-theme"><a className="c-theme" href={assignment.assignmentFile} rel="noopener noreferrer" target="_blank">Attachment <i className="fa fa-cloud-download"></i></a></div>
                                            
                                            {(isTrainee && compareDateTime(assignment.time) && !assignment.answers?.some(answer => answer.traineeEmail === currentUser.email)) ? <div className="batchBtn bg-theme add-ass" onClick={()=>{toogleAddAnswerView(assignment.assignmentId)}}>Submit Answer</div> : <></>}
                                            {assignment.answers?.some(answer => answer.traineeEmail === currentUser.email) ? 
                                            <>
                                            <br/>
                                            <i className="fa fa-check green-check"></i> Submitted
                                            <div>Score: {getScore(assignment.answers) === null ? <span>Pending...</span> : <span>{getScore(assignment.answers)}% </span>}</div>
                                            </> : <></>}
                                            {(isTrainer && schedule.trainerEmail === currentUser.email) ? 
                                            <div className="row hmap">
                                                {assignment.answers?.map((answer) => {
                                                return (
                                                    <div className="answer-card bg2 c1">
                                                        <div>{answer.traineeEmail}</div>
                                                        <div>Answer: <span>{answer.answer}</span></div>
                                                        <div className="assignment-attachment bg2 c-theme"><a className="c-theme" href={answer.answerFile} rel="noopener noreferrer" target="_blank">Files <i className="fa fa-cloud-download"></i></a></div>
                                                        <div>
                                                            <div>Score: {answer.evaluation === null ? <span>Pending...</span> : <span>{answer.evaluation}% </span>}</div>
                                                            <input className='input-default c1 bg2-change' type="text" name="evaluation" id="evaluation" value={evaluation} onChange={handleEvaluation} placeholder="Score: 1 to 100" required/> 
                                                            <div className="batchBtn bg-theme add-ass" onClick={()=>{handleEvaluate(answer.answerId)}}>Evaluate</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            </div> : <></>}
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                </div>
                {/* </div> */}
            </div>
        )}
        <br/>
        <br/>
        {traineeAddView ? (
            <div className="w3-animate-opacity">
                <div className="modal-void" onClick={toogleAddTrainee}></div>
                <div className="fixed-center bg2 c1 modal-box">
                    <div className="closeBtn modal-close c3" id="close" onClick={toogleAddTrainee}><i className="fa fa-close"></i></div>
                    <br/>
                    <br/>
                    <form onSubmit={handleAddTraineeSubmit}>
                        <div className="modal-inner">
                        <input className='input-default c1 bg2-change' type="email" name="email" id="trainee-email" value={addTrainee.email} onChange={handleAddTrainee} placeholder="Trainee Email" required/>
                        <br/>
                        </div>
                        <br/>
                        <input className='input-button' type="submit" name="add-submit" id="add-submit" value="Add Trainee" onChange={()=>{}}/>
                        </form>
                </div>          
            </div>
        ) : <></>}
        {scheduleAddView ? (
            <div className="w3-animate-opacity">
                <div className="modal-void" onClick={toogleAddSchedule}></div>
                <div className="fixed-center bg2 c1 modal-box">
                    <div className="closeBtn modal-close c3" id="close" onClick={toogleAddSchedule}><i className="fa fa-close"></i></div>
                    <br/>
                    <br/>
                    <form onSubmit={handleAddScheduleSubmit}>
                    <div className="modal-inner">
                    <input className='input-default c1 bg2-change' type="email" name="trainerEmail" id="trainerEmail" value={schedule.trainerEmail} onChange={handleAddSchedule} placeholder="Trainer Email" required/>
                    <br/>
                    <br/>
                    <input className='input-default c1 bg2-change' type="text" name="courseCode" id="courseCode" value={schedule.courseCode} onChange={handleAddSchedule} placeholder="Course Code" required/>
                    <br/>
                    <br/>
                    <label className='input-label c1'>Start Date</label>
                    <input className='input-default input-date c1 bg2-change' type="date" name="startDate" id="startDate" value={schedule.startDate} onChange={handleAddSchedule} required/>
                    <br/>
                    <br/>
                    <label className='input-label c1'>End Date</label>
                    <input className='input-default input-date c1 bg2-change' type="date" name="endDate" id="endDate" value={schedule.endDate} onChange={handleAddSchedule} required/>
                    <br/>
                    <br/>
                    <input className='input-default input-date c1 bg2-change' type="time" name="scheduleStartTime" id="scheduleStartTime" value={schedule.scheduleStartTime} onChange={handleAddSchedule} placeholder="Start Time" required/>
                    <br/>
                    <br/>
                    <input className='input-default input-date c1 bg2-change' type="time" name="scheduleEndTime" id="scheduleEndTime" value={schedule.scheduleEndTime} onChange={handleAddSchedule} placeholder="End Time" required/>
                    <br/>
                    <br/>
                    </div>
                    <br/>
                    <input className='input-button' type="submit" name="add-submit" id="add-submit" value="Add Trainee" onChange={()=>{}}/>
                    </form>
                </div>          
            </div>
        ) : <></>}
        {assAddView ? (
            <div className="w3-animate-opacity">
                <div className="modal-void" onClick={()=>{toogleAddAssView(null)}}></div>
                <div className="fixed-center bg2 c1 modal-box">
                    <div className="closeBtn modal-close c3" id="close" onClick={()=>{toogleAddAssView(null)}}><i className="fa fa-close"></i></div>
                    <br/>
                    <br/>
                    <form onSubmit={handleAddAssSubmit}>
                    <div className="modal-inner">
                    <input className='input-default c1 bg2-change' type="text" name="question" id="question" value={ass.question} onChange={handleAddAss} placeholder="Question" required/>
                    <br/>
                    <br/>
                    <label className='input-label c1'>Attachment</label>
                    <br/>
                    <label className="custom-file-upload file-top-5 c3">
                        <input type="file" name="assignmentFile" id="assignmentFile" onChange={handleAssUpload}/>
                        <i className="fa fa-cloud-upload"></i><span id='assignmentFile-file'> Choose File</span>
                    </label>
                    <br/>
                    <br/>
                    <label className='input-label c1'>Deadline</label>
                    <input className='input-default input-date c1 bg2-change' type="datetime-local" name="time" id="time" value={ass.time} onChange={handleAddAss} required/>
                    <br/>
                    </div>
                    <br/>
                    <input className='input-button' type="submit" name="add-submit" id="add-submit" value="Add Assignment" onChange={()=>{}}/>
                    </form>
                </div>          
            </div>
        ) : <></>}
        {ansAddView ? (
            <div className="w3-animate-opacity">
                <div className="modal-void" onClick={()=>{toogleAddAnswerView(null)}}></div>
                <div className="fixed-center bg2 c1 modal-box">
                    <div className="closeBtn modal-close c3" id="close" onClick={()=>{toogleAddAnswerView(null)}}><i className="fa fa-close"></i></div>
                    <br/>
                    <br/>
                    <form onSubmit={handleAddAnswerSubmit}>
                    <div className="modal-inner">
                    <input className='input-default c1 bg2-change' type="text" name="answer" id="answer" value={answer.answer} onChange={handleAddAnswer} placeholder="Answer" required/>
                    <br/>
                    <br/>
                    <label className='input-label c1'>Answer Attachment</label>
                    <br/>
                    <label className="custom-file-upload file-top-5 c3">
                        <input type="file" name="answerFile" id="answerFile" onChange={handleAnswerUpload}/>
                        <i className="fa fa-cloud-upload"></i><span id='answerFile-file'> Choose File</span>
                    </label>
                    <br/>
                    </div>
                    <br/>
                    <input className='input-button' type="submit" name="add-submit" id="add-submit" value="Submit Answer" onChange={()=>{}}/>
                    </form>
                </div>          
            </div>
        ) : <></>}
        </>
        
    )
}