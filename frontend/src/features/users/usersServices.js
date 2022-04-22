import axios from 'axios';

const API_URL = "/api/user/";

//Login User
const loginUser = async (user) => {
    const response = await axios.post(API_URL, user);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};


const usersServices = {
    loginUser,
}

export default usersServices;