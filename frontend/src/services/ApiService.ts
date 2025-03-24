import axios from 'axios';
import {Node} from "../types/Node";

const API_URL = process.env.NODE_ENV === 'production'
    ? 'http://localhost:8080'
    : 'http://localhost:8080';

const ApiService = {
    searchNodes: async (value: string) => {
        try {
            const result = await axios.get(`${API_URL}/api/Nodes/search`, {
                params: {
                    value
                }
            });
            return result.data;
        } catch (error) {
            console.error("Error searching for Nodes:", error);
        }
    },

    saveChanges: async (node: Node) => {
        try {
            const res = await axios.post(`${API_URL}/api/Nodes/save`, node);
            return res.data;
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    },

    resetChanges: async () => {
        try {
            await axios.post('http://localhost:8080/api/Nodes/reset');
        } catch (error) {
            console.error("Error resting changes:", error);
        }
    },
};

export default ApiService;