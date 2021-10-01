import axios from 'axios';
class Partner {
    GetPartners = async () => {
        return await axios.get(`http://localhost:8080/getPartners`);
    };

    CreatePartner = async (data) => {
        return await axios.post(`http://localhost:8080/addPartner`, data);
    }

    EditPartner = async (id, data) => {
        console.log(id, data)
        return await axios.put(`http://localhost:8080/editPartner/${id}`, data);
    };

    DeletePartner = async (id) => {
        return await axios.delete(`http://localhost:8080/deletePartner/${id}`);
    }
}

export default new Partner();
