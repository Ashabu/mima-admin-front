import axios from 'axios';
class MarketingTool {
    GetMarketingTools = async () => {
        return await axios.get(`${globalConfig.api_URL}/getMarketingTools`);
    };
    AddMarketingTool = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/addMarketingTool`, data);
    }

    UpdateMarketingTool = async (id, data) => {
        console.log(id, data)
        return await axios.put(`${globalConfig.api_URL}/editMarketingTool/${id}`, data);
    };

    DeleteMarketingTool = async (id) => {
        return await axios.delete(`${globalConfig.api_URL}/deleteMarketingTool/${id}`);
    };

    AddMarketingBaner = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/marketing/addPicture`, data);
    };

    DeleteMarketingBaner = async (id, imgId) => {
        let data = {
            pictureId: imgId
        };
        
        return await axios.put(`${globalConfig.api_URL}/marketing/deletePicture/${id}`, data);
    };
}

export default new MarketingTool();
