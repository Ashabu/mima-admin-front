import axios from 'axios';

class Commisions {
    GetCommisions = async () => {
        return await axios.get(`${globalConfig.api_URL}/getCommisions`);
    };

    CreateCommision = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/addCommision`, data);
    }

    EditCommision = async (id, data) => {
        console.log(id, data)
        return await axios.put(`${globalConfig.api_URL}/editCommision/${id}`, data);
    };

    DeleteCommision = async (id) => {
        return await axios.delete(`${globalConfig.api_URL}/deleteCommision/${id}`);
    }
}

export default new Commisions();
