import axios from 'axios';

class Commisions {
    GetCommisions = async () => {
        return await axios.get(`http://localhost:8080/getCommisions`);
    };

    CreateCommision = async (data) => {
        return await axios.post(`http://localhost:8080/addCommision`, data);
    }

    EditCommision = async (id, data) => {
        console.log(id, data)
        return await axios.put(`http://localhost:8080/editCommision/${id}`, data);
    };

    DeleteCommision = async (id) => {
        return await axios.delete(`http://localhost:8080/deleteCommision/${id}`);
    }
}

export default new Commisions();
