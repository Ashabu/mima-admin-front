import axios from 'axios';
class Benefit {
    GetBenefits = async () => {
        return await axios.get(`${globalConfig.api_URL}/getBenefits`);
    };

    CreateBenefit = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/addBenefit`, data);
    }

    EditBenefit = async (id, data) => {
        console.log(id, data)
        return await axios.put(`${globalConfig.api_URL}/editBenefit/${id}`, data);
    };

    DeleteBenefit = async (id) => {
        return await axios.delete(`${globalConfig.api_URL}/deleteBenefit/${id}`);
    }
}

export default new Benefit();
