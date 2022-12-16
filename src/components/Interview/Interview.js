import {useDispatch} from 'react-redux';

import {deleteInterviewThunk, interviewActions} from '../../store';

import css from './Interview.module.css';
import {ApplicantWithout} from '../ApplicantWithout/ApplicantWithout';
import {InterviewerWithout} from '../InterviewerWithout/InterviewerWithout';

const Interview = ({interview}) => {
    const {id, time, during, applicant, interviewer} = interview;

    const dispatch = useDispatch();

    return (
        <div className={`${css.interview}`}>
            <div>Id: {id}</div>
            <div>Time: {time}</div>
            <div>During: {during}</div>
            <div>Applicant: <ApplicantWithout applicant={applicant}/></div>
            <div>Interviewer: <InterviewerWithout interviewer={interviewer}/></div>
            <button onClick={() => dispatch(deleteInterviewThunk({id}))}>Delete</button>
            <button onClick={() => dispatch(interviewActions.interviewToUpdate({interview}))}>Update</button>
        </div>
    );
};

export {Interview};