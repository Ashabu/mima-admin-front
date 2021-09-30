import axios from 'axios';
class Faq  {
    GetFaqs = async () => {
        return await axios.get(`http://localhost:8080/getFaqs`);
    };

    CreateFaq = async (data) => {
        return await axios.post(`http://localhost:8080/addFaq`, data);
    }
    
    EditFaq = async (id, data) => {
        return await axios.put('http://localhost:8080/editFaq', data, { id });
    };

    DeleteFaq = async (id) => {
        return await axios.put('http://localhost:8080/deleteFaq', {}, { id });
    }
}

export default new Faq();
