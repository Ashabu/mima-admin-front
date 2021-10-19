import axios from 'axios';
class Links {
    GetLinks = async () => {
        return await axios.get(`${globalConfig.api_URL}/getSkypeLinks`);
    };

    CreateSkypeLink = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/addSkypeLink`, data);
    }

    EditSkypeLink = async (id, data) => {
        return await axios.put(`${globalConfig.api_URL}/editSkypeLink/${id}`, data);
    };

    DeleteSkypeLink = async (id) => {
        return await axios.delete(`${globalConfig.api_URL}/deleteSkypeLink/${id}`);
    }
}

export default new Links();