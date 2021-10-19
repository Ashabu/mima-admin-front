import axios from 'axios';

class Affiliate {
    GetAffiliateInfos = async () => {
        return await axios.get(`${globalConfig.api_URL}/getMainInfo`);
    };

    AddAffiliateInfo = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/addMainInfo`, data);
    }

    UpdateAffiliateInfo = async (id, data) => {
        return await axios.put(`${globalConfig.api_URL}/editMainInfo/${id}`, data);
    };

    DeleteAffiliateInfo= async (id) => {
        return await axios.delete(`${globalConfig.api_URL}/deleteMainInfo/${id}`);
    };

    AddAffiliateBaner = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/mainInfo/addPicture`, data);
    };

    DeleteAffiliateBaner = async (id, imgId) => {
        let data = {
            pictureId: imgId
        };

        return await axios.put(`${globalConfig.api_URL}/mainInfo/deletePicture/${id}`, data);
    };
}

export default new Affiliate();
