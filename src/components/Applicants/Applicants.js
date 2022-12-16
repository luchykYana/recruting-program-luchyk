import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import {getAllApplicants} from '../../store';
import {Applicant} from '../Applicant/Applicant';

import css from './Applicants.module.css';

const Applicants = () => {
    const {applicants, status, error} = useSelector(state => state.applicantReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllApplicants());
    }, []);

    return (
        <div className={css.applicants}>
            {status === 'pending' && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
            {applicants.map(item => <Applicant key={item.id} applicant={item}/>)}
        </div>
    );
};

export {Applicants};