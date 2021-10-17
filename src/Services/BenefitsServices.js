import axios from 'axios';
class Benefit {
    GetBenefits = async () => {
        return await axios.get(`http://localhost:8080/getBenefits`);
    };

    CreateBenefit = async (data) => {
        return await axios.post(`http://localhost:8080/addBenefit`, data);
    }

    EditBenefit = async (id, data) => {
        console.log(id, data)
        return await axios.put(`http://localhost:8080/editBenefit/${id}`, data);
    };

    DeleteBenefit = async (id) => {
        return await axios.delete(`http://localhost:8080/deleteBenefit/${id}`);
    }
}

export default new Benefit();
