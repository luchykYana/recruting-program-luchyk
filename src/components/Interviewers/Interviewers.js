import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import {getAllInterviewers} from '../../store';
import {Interviewer} from '../Interviewer/Interviewer';

import css from './Interviewers.module.css';

const Interviewers = () => {
    const {interviewers, status, error} = useSelector(state => state.interviewerReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllInterviewers());
    }, []);

    return (
        <div className={css.interviewers}>
            {status === 'pending' && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
            {interviewers.map(item => <Interviewer key={item.id} interviewer={item}/>)}
        </div>
    );
};

export {Interviewers};