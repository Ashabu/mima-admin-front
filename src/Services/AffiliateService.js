import axios from 'axios';

class Affiliate {
    GetAffiliateInfos = async () => {
        return await axios.get(`${globalConfig.api_URL}/getAffiliate`);
    };

    AddAffiliateInfo = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/addAffiliate`, data);
    }

    UpdateAffiliateInfo = async (id, data) => {
        return await axios.put(`${globalConfig.api_URL}/editAffiliate/${id}`, data);
    };

    DeleteAffiliateInfo= async (id) => {
        return await axios.delete(`${globalConfig.api_URL}/deleteAffiliate/${id}`);
    };

}

export default new Affiliate();
