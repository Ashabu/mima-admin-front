import axios from 'axios';

class User  {
    GetFaqs = async () => {
        return await axios.get(`http://localhost:8080/getUsers`);
    };

    SignUp = async (data) => {
        return await axios.post(`http://localhost:8080/signUp`, data);
    }

    SignIn = async (data) => {
        return await axios.post(`http://localhost:8080/signIn`, data);
    };

    DeleteUser = async (id) => {
        return await axios.delete(`http://localhost:8080/deleteUser/${id}`);
    }
}

export default new User();