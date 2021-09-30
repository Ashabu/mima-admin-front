import axios from 'axios';
class Testimonial {
    GetTestimonials = async () => {
        return await axios.get(`http://localhost:8080/getTestimonials`);
    };

    CreateTestimonial = async (data) => {
        return await axios.post(`http://localhost:8080/addTestimonial`, data);
    }

    EditTestimonial = async (id, data) => {
        console.log(id, data)
        return await axios.put(`http://localhost:8080/editTestimonial/${id}`, data);
    };

    DeleteTestimonial = async (id) => {
        return await axios.delete(`http://localhost:8080/deleteTestimonial/${id}`);
    }
}

export default new Testimonial();
