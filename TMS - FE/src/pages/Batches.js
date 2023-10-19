import { useEffect, useState } from 'react';
import { addBatch, getBatches, updateBatch } from '../api/authentication';
import { showNotification } from '../features/notification';
import store from '../redux/store';
import './css/batches.css'

export default function Batches(props) {
    // const currentUser = store.getState().auth.user;
    const isAdmin = store.getState().auth.user.isAdmin;
    const isTrainer = store.getState().auth.user.isTrainer;
    const isTrainee = store.getState().auth.user.isTrainee;
    const [saveView, setSaveView] = useState({
        save: false,
        mode: ""
    });
    const [eBatch, setEBatch] = useState({
        batchCode: "",
        name: "",
        description: "",
        status: ""
    });
    const [batchView, setBatchView] = useState([]);
    const [batches, setBatches] = useState([]);
    const [dbBatches, setDbBatches] = useState({
        previousBatches: [],
        runningBatches: [],
        upcomingBatches: []
    });
    const handleBatches = () => {
        var arr = [];
        if(document.getElementById('pBatches').checked === true) dbBatches.previousBatches.forEach(c => { arr.push(c) });
        if(document.getElementById('rBatches').checked === true) dbBatches.runningBatches.forEach(c => { arr.push(c) });
        if(document.getElementById('uBatches').checked === true) dbBatches.upcomingBatches.forEach(c => { arr.push(c) });
        setBatches(arr);
        setBatchView(searchFilter(arr));
        // console.log(arr);
    }
    // console.log("view", batchView);
    const handleChange = (e) => {
        e.persist();
        setEBatch(batch => ({
        ...batch,
        [e.target.name]: e.target.value
        }));
    };
    const handleBatch = (batchCode) => {
        window.location.assign('/batch?batchCode='+batchCode);
    }
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        updateBatch(eBatch).then((response) => {
            console.log("response", response);
            if(response.status === 200){
            fetchBatches();
            showNotification(response.data.message, "success");
            }
        }).catch((err) => {
            // console.log(err);
            if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
            else showNotification("Failed to update batch", "error");
        })
    };
    const handleAddSubmit = (e) => {
        e.preventDefault();
        addBatch(eBatch).then((response) => {
            console.log("response", response);
            if(response.status === 200){
            fetchBatches(); 
            showNotification(response.data.message, "success");
            }
        }).catch((err) => {
            // console.log(err);
            if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
            else showNotification("Failed to add batch", "error");
        })
    };
    const handleSaveBatchClose = () => {
        setSaveView({
            save: false,
            mode: ""
        })
    }
    const handleSaveBatch = (batch) => {
        if(batch.target !== undefined) {
            setEBatch({
                batchCode: "",
                name: "",
                description: "",
                status: ""
            });
            setSaveView({
                save: true,
                mode: "add"
            })
        } else {
            setEBatch(batch);
            setSaveView({
                save: true,
                mode: "edit"
            })
        }
        // console.log(batch);
    }
    // console.log(eBatch);
    const searchFilter = (batches) => {
        var searchValue = document.getElementById("batch-search").value;
        if(searchValue !== "") {
            // console.log("filter", batches[0].name);
            return batches.filter(batch => (batch?.name?.toLowerCase().includes(searchValue.toLowerCase()) || batch?.batchCode?.toLowerCase().includes(searchValue.toLowerCase())));
        }
        return batches;
    }
const handleSearch = () => {
    setBatchView(searchFilter(batches))
}
const fetchBatches = () => {
    getBatches().then((response) => {
        console.log("response-refetch", response);
        if(response.status === 200){
            var result = {
                previousBatches: response.data.previousBatches,
                runningBatches: response.data.runningBatches,
                upcomingBatches: response.data.upcomingBatches
            };
            setDbBatches(result);
            var arr = [];
            if(document.getElementById('pBatches').checked === true) result.previousBatches.forEach(c => { arr.push(c) });
            if(document.getElementById('rBatches').checked === true) result.runningBatches.forEach(c => { arr.push(c) });
            if(document.getElementById('uBatches').checked === true) result.upcomingBatches.forEach(c => { arr.push(c) });
            setBatches(arr);
            setBatchView(searchFilter(arr));
        }
    }).catch((err) => {
        // console.log(err);
        if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
        else showNotification("Failed to get batches", "error");
    })
}
    useEffect(()=>{
        getBatches().then((response) => {
            console.log("response", response);
            if(response.status === 200){
                var result = {
                    previousBatches: response.data.previousBatches,
                    runningBatches: response.data.runningBatches,
                    upcomingBatches: response.data.upcomingBatches
                };
                setDbBatches(result);
                document.getElementById("rBatches").checked = true;
                setBatches(response.data.runningBatches);
                setBatchView(searchFilter(response.data.runningBatches));
            }
        }).catch((err) => {
            // console.log(err);
            if(err.response.data.message !== undefined) showNotification(err.response.data.message, "error");
            else showNotification("Failed to get batches", "error");
        })
    }, [])
    return (
        <>
        {(isAdmin || isTrainer || isTrainee) ? (
        <>
        <div className='batches-box'>
            <div className='row full'>
                <div align="left" className='column-50  w3-animate-left'>
                <input className='input-default c1 bg1' type="text" name="batch" id="batch-search" onChange={handleSearch} placeholder='Search batch name or code'/>
                </div>
                
                {isAdmin ? <>
                <div className='space'></div>
                <div align="right" className='column-50  w3-animate-right'>
                <div className='add-btn c2 max-300' onClick={handleSaveBatch}><i className="fa fa-plus"></i> Add a Batch</div>
                </div>
                </> : <></>}
            </div>
            <div className='row full'>
            <form className='batch-status'>
                {(isAdmin || isTrainer) ? 
                <label className="checkbox-inline c2">
                <input type="checkbox" id="pBatches" onChange={handleBatches} value=""/>Previous Batches
                </label> : <></>}
                <label className="checkbox-inline c2">
                <input type="checkbox" id="rBatches" onChange={handleBatches} value=""/>Running Batches
                </label>
                {(isAdmin || isTrainer) ? 
                <label className="checkbox-inline c2">
                <input type="checkbox" id="uBatches" onChange={handleBatches} value=""/>Up Coming Batches
                </label> : <></>}
            </form>
            </div>
            <div className='full cen w3-animate-bottom'>
                {batchView.map((batch) => {
                    return (
                    <div key={batch.batchCode} className='batch-card bg2 batch-column-50' onClick={() => {handleBatch(batch.batchCode)}}>
                    <div className='row-2 full v-center'>
                    {/* <div className='batch-status-tag c1'>{batch.status}</div> */}
                        <div className='card-code bg1 c1'>{batch.batchCode}</div>
                        <div className='card-info'>
                            <div className='card-name c1'>{batch.name}</div>
                            <div className='card-des c3'>{batch.description}</div>
                        </div>
                    </div>
                    {isAdmin ? <div className='editBtn bg-theme edit-batch' onClick={() => {handleSaveBatch(batch)}}>Edit</div> : <></>}
                </div>
                    )
                })}
            </div>
            </div>

            {saveView.save ? (
            <div className="">
                <div className="modal-void" onClick={handleSaveBatchClose}></div>
                <div className="fixed-center bg2 c1 modal-box">
                    <div className="closeBtn modal-close c3" id="close" onClick={handleSaveBatchClose}><i className="fa fa-close"></i></div>
                    <br/>
                    <br/>
                    {(saveView.mode === "add") ? (
                        <>
                        <form onSubmit={handleAddSubmit}>
                        <div className="modal-inner">
                        <input className='input-default c1 bg2-change' type="text" name="batchCode" id="batchCode" value={eBatch.batchCode} onChange={handleChange} placeholder="Batch Code" required/>
                        <br/>
                        <br/>
                        <input className='input-default c1 bg2-change' type="text" name="name" id="name" pattern="[A-Za-z0-9\s.]{1,40}" title="Please insert not more than 40 characters or digits only" value={eBatch.name} onChange={handleChange} placeholder="Name" required/>
                        <br/>
                        <br/>
                        <input className='input-default c1 bg2-change' type="text" name="description" id="description" value={eBatch.description} onChange={handleChange} placeholder="Description" required/>
                        <br/>
                        <br/>
                        <label className='input-label c1'>Start Date</label>
                        <input className='input-default input-date c1 bg2-change' type="date" name="startDate" id="startDate" value={eBatch.startDate} onChange={handleChange} required/>
                        <br/>
                        <br/>
                        <label className='input-label c1'>End Date</label>
                        <input className='input-default input-date c1 bg2-change' type="date" name="endDate" id="endDate" value={eBatch.endDate} onChange={handleChange} required/>
                        </div>
                        <br/>
                        <input className='input-button' type="submit" name="add-submit" id="add-submit" value="Add Batch" onChange={()=>{}}/>
                        </form>
                        </>
                    ) : <></>}
                    {(saveView.mode === "edit") ? (
                        <>
                        <form onSubmit={handleUpdateSubmit}>
                        <div className="modal-inner">
                        <input className='input-default c1 bg2-change' type="text" name="name" id="name" pattern="[A-Za-z0-9\s.]{1,40}" title="Please insert not more than 40 characters or digits only" value={eBatch.name} onChange={handleChange} placeholder="Name" required/>
                        <br/>
                        <br/>
                        <input className='input-default c1 bg2-change' type="text" name="description" id="description" value={eBatch.description} onChange={handleChange} placeholder="Description" required/>
                        <br/>
                        <br/>
                        <label className='input-label c3'>Start Date</label>
                        <input className='input-default input-date c1 bg2-change' type="date" name="startDate" id="startDate" value={eBatch.startDate} onChange={handleChange} required/>
                        <br/>
                        <br/>
                        <label className='input-label c3'>End Date</label>
                        <input className='input-default input-date c1 bg2-change' type="date" name="endDate" id="endDate" value={eBatch.endDate} onChange={handleChange} required/>
                        <br/>
                        <br/>
                        </div>
                        <input className='input-button' type="submit" name="update-submit" id="update-submit" value="Save Batch" onChange={()=>{}}/>
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