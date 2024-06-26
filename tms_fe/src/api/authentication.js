import axios from 'axios';
import { getCookie, deleteCookie } from "../cookies/cookieHandler.js";
import { authDestroy } from '../redux/actions.js';
import store from '../redux/store.js';
import API_BASE_URL from './config.js';

export const getToken = () => {
    return getCookie("token.tms");
}

export const userLogin = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/auth/login`,
        data: authRequest
    });
}

export const userRegister = (registerRequest) => {
    console.log(registerRequest);
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/auth/register`,
        data: registerRequest
    });
}

export const uploadFile = (formData) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/uploadFile`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const traineeApplicationFormSubmit = (submitRequest) => {
    console.log(submitRequest);
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/trainee/apply`,
        data: submitRequest
    });
}

export const assignRole = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/user/assign-role`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: authRequest
    });
}

export const updateApplicationStatus = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/trainee/application-status`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: authRequest
    });
}

export const removeRole = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/user/remove-role`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: authRequest
    });
}

export const deleteProfileData = (email) => {
    return axios({
        method: 'DELETE',
        url: `${API_BASE_URL}/api/user/delete/${email}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
}

export const updateProfile = (updateRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/user/edit`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: updateRequest
    });
}

export const getCourses = () => {
    return axios({
        method: 'GET',
        url: `${API_BASE_URL}/api/course/get/all`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
}

export const addBatch = (addRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/batch/save`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: addRequest
    });
}

export const updateBatch = (updateRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/batch/update`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: updateRequest
    });
}

export const getBatches = () => {
    return axios({
        method: 'GET',
        url: `${API_BASE_URL}/api/batch/get/all`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
}

export const getDashboard = () => {
    return axios({
        method: 'GET',
        url: `${API_BASE_URL}/api/user/get/dashboard`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
}

export const addScheduleToBatch = (addRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/batch/add-schedule`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: addRequest
    });
}

export const addScheduleAssignment = (addRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/schedule/add-assignment`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: addRequest
    });
}

export const addAssignmentAnswer = (addRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/schedule/add-assignment-answer`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: addRequest
    });
}

export const evaluationAnswer = (req) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/schedule/add-assignment-answer-evaluate`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: req
    });
}

export const removeScheduleFromBatch = (addRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/batch/remove-schedule`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: addRequest
    });
}

export const removeAssignment = (removeRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/schedule/remove-assignment`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: removeRequest
    });
}

export const addTraineeToBatch = (addRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/batch/add-trainee`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: addRequest
    });
}

export const removeTraineeFromBatch = (removeRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/batch/remove-trainee`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: removeRequest
    });
}

export const addCourse = (addRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/course/save`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: addRequest
    });
}

export const updateCourse = (updateRequest) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/course/update`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: updateRequest
    });
}

export const getCurrentUser = () => {
    return axios({
        method: 'GET',
        url: `${API_BASE_URL}/api/auth/auto-login`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
}

export const getProfileData = (email) => {
    return axios({
        method: 'GET',
        url: `${API_BASE_URL}/api/user/get/${email}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
}

export const getBatchData = (batchCode) => {
    return axios({
        method: 'GET',
        url: `${API_BASE_URL}/api/batch/get/${batchCode}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
}

export const userLogout = () => {
    deleteCookie("token.tms");
    store.dispatch(authDestroy());
}
