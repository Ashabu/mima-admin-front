import axios from 'axios';

class Affiliate {
    GetAffiliateInfos = async () => {
        return await axios.get(`http://localhost:8080/getAffiliate`);
    };

    AddAffiliateInfo = async (data) => {
        return await axios.post(`http://localhost:8080/addAffiliate`, data);
    }

    UpdateAffiliateInfo = async (id, data) => {
        console.log(id, data)
        return await axios.put(`http://localhost:8080/editAffiliate/${id}`, data);
    };

    DeleteAffiliateInfo= async (id) => {
        return await axios.delete(`http://localhost:8080/deleteAffiliate/${id}`);
    }
}

export default new Affiliate();
