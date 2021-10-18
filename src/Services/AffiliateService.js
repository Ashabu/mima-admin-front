import axios from 'axios';

class Affiliate {
    GetAffiliateInfos = async () => {
        return await axios.get(`http://localhost:8080/getMainInfo`);
    };

    AddAffiliateInfo = async (data) => {
        return await axios.post(`http://localhost:8080/addMainInfo`, data);
    }

    UpdateAffiliateInfo = async (id, data) => {
        return await axios.put(`http://localhost:8080/editMainInfo/${id}`, data);
    };

    DeleteAffiliateInfo= async (id) => {
        return await axios.delete(`http://localhost:8080/deleteMainInfo/${id}`);
    }
}

export default new Affiliate();
