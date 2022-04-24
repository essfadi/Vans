import axios from 'axios';

const API_URL = "/api/schedule/";

//Get Schedule
const getAllSchedules = async (user) => {
    const response = await axios.get(API_URL, user);
    if (response.data) {
        localStorage.setItem("schedules", JSON.stringify(response.data));
    }
    return response.data;
};

const schedulesServices = {
    getAllSchedules,
};

export default schedulesServices;