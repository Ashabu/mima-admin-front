import axios from 'axios';
class MarketingTool {
    GetMarketingTools = async () => {
        return await axios.get('http://localhost:8080/getMarketingTools');
    };
    AddMarketingTool = async (data) => {
        return await axios.post('http://localhost:8080/addMarketingTool', data);
    }

    UpdateMarketingTool = async (id, data) => {
        console.log(id, data)
        return await axios.put(`http://localhost:8080/editMarketingTool/${id}`, data);
    };

    DeleteMarketingTool = async (id) => {
        return await axios.delete(`http://localhost:8080/deleteMarketingTool/${id}`);
    }
}

export default new MarketingTool();
