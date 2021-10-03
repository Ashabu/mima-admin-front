import axios from 'axios';
class MainInfo {
    GetMainInfo = async () => {
        return await axios.get(`http://localhost:8080/getMainInfo`);
    };

    AddMainInfo = async (data) => {
        return await axios.post(`http://localhost:8080/addInfo`, data);
    }

    UpdateMainInfo = async (id, data) => {
        console.log(id, data)
        return await axios.put(`http://localhost:8080/editInfo/${id}`, data);
    };

    DeleteMainInfo = async (id) => {
        return await axios.delete(`http://localhost:8080/deleteInfo/${id}`);
    }
}

export default new MainInfo();
