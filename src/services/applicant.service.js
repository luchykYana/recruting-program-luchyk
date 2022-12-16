import {axiosService} from './axios.server';
import {recruiterURL} from '../configs';

const {recruiterAxiosService} = axiosService;
const {applicants} = recruiterURL

export const applicantService = {
    createItem: (item) => recruiterAxiosService.post(applicants, item).then(value => value.data),

    getAll: () => recruiterAxiosService.get(applicants),

    updateById: (id, item) => recruiterAxiosService.put(`${applicants}/${id}`, item),

    deleteById: (id) => recruiterAxiosService.delete(`${applicants}/${id}`)
}