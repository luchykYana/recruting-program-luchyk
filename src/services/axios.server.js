import axios from 'axios';

import {recruiterURL} from '../configs';

const recruiterAxiosService = axios.create({
    baseURL: recruiterURL.baseURL
});

export const axiosService = {
    recruiterAxiosService,
}