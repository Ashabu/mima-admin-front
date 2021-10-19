import axios from 'axios';

class User  {
    GetUsers = async () => {
        return await axios.get(`${globalConfig.api_URL}/getUsers`);
    };

    SignUp = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/signUp`, data);
    }

    SignIn = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/signIn`, data);
    };

    DeleteUser = async (id) => {
        return await axios.delete(`${globalConfig.api_URL}/deleteUser/${id}`);
    }
}

export default new User();