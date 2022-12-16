import {axiosService} from './axios.server';
import {recruiterURL} from '../configs';

const {recruiterAxiosService} = axiosService;
const {interviewers} = recruiterURL

export const interviewerService = {
    createItem: (item) => recruiterAxiosService.post(interviewers, item).then(value => value.data),

    getAll: () => recruiterAxiosService.get(interviewers),

    updateById: (id, item) => recruiterAxiosService.put(`${interviewers}/${id}`, item),

    deleteById: (id) => recruiterAxiosService.delete(`${interviewers}/${id}`)
}