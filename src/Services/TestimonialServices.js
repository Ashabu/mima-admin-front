import axios from 'axios';
class Testimonial {
    GetTestimonials = async () => {
        return await axios.get(`${globalConfig.api_URL}/getTestimonials`);
    };

    CreateTestimonial = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/addTestimonial`, data);
    }

    EditTestimonial = async (id, data) => {
        console.log(id, data)
        return await axios.put(`${globalConfig.api_URL}/editTestimonial/${id}`, data);
    };

    DeleteTestimonial = async (id) => {
        return await axios.delete(`${globalConfig.api_URL}/deleteTestimonial/${id}`);
    }
}

export default new Testimonial();
