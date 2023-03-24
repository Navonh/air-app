import axios from 'axios';
import { baseURL } from './Environment';

const instance = axios.create({
    baseURL: baseURL,
});

export const fetchData = async (method, endpoint, data = null) => {
    try {
        const response = await instance.request({
            method: method,
            url: endpoint,
            data: data,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
