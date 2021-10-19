import axios from 'axios';
class Faq {
    GetFaqs = async () => {
        return await axios.get(`${globalConfig.api_URL}/getFaqs`);
    };

    CreateFaq = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/addFaq`, data);
    }

    EditFaq = async (id, data) => {
        console.log(id, data)
        return await axios.put(`${globalConfig.api_URL}/editFaq/${id}`, data);
    };

    DeleteFaq = async (id) => {
        return await axios.delete(`${globalConfig.api_URL}/deleteFaq/${id}`);
    }
}

export default new Faq();
