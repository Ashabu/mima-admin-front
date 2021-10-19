import axios from 'axios';
class Partner {
    GetPartners = async () => {
        return await axios.get(`${globalConfig.api_URL}/getPartners`);
    };

    CreatePartner = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/addPartner`, data);
    }

    EditPartner = async (id, data) => {
        console.log(id, data)
        return await axios.put(`${globalConfig.api_URL}/editPartner/${id}`, data);
    };

    DeletePartner = async (id) => {
        return await axios.delete(`${globalConfig.api_URL}/deletePartner/${id}`);
    }
}

export default new Partner();
