import axios from 'axios';
class Image {

    CreateImage = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/addImage`, data);
    };

    EditImage = async (id, data) => {
        return await axios.put(`${globalConfig.api_URL}/editImage/${id}`, data);
    };

    DeleteImage = async (id) => {
        return await axios.delete(`${globalConfig.api_URL}/deleteImage/${id}`);
    };
}

export default new Image();
