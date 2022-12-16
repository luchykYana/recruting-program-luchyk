import {axiosService} from './axios.server';
import {recruiterURL} from '../configs';

const {recruiterAxiosService} = axiosService;
const {interviews} = recruiterURL

export const interviewService = {
    createItem: (item) => recruiterAxiosService.post(interviews, item).then(value => value.data),

    getAll: () => recruiterAxiosService.get(interviews),

    updateById: (id, item) => recruiterAxiosService.put(`${interviews}/${id}`, item),

    deleteById: (id) => recruiterAxiosService.delete(`${interviews}/${id}`)
}