import axios from 'axios';

class Commisions {
    GetCommisions = async () => {
        return await axios.get(`${globalConfig.api_URL}/getCommissions`);
    };

    CreateCommision = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/addCommission`, data);
    }

    EditCommision = async (id, data) => {
        console.log(id, data)
        return await axios.put(`${globalConfig.api_URL}/editCommission/${id}`, data);
    };

    DeleteCommision = async (id) => {
        return await axios.delete(`${globalConfig.api_URL}/deleteCommission/${id}`);
    }

    CreateAmountRange = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/addAmountRange`, data);
    }

    EditAmountRange = async (id, data) => {
        console.log(id, data)
        return await axios.put(`${globalConfig.api_URL}/eidtAmountRange/${id}`, data);
    };

    DeleteAmountRange = async (id) => {
        return await axios.delete(`${globalConfig.api_URL}/deleteAmountRange/${id}`);
    }
}

export default new Commisions();
