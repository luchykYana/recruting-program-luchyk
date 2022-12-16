import {useDispatch} from 'react-redux';

import {levelEnum} from '../../configs';
import {interviewerActions, deleteInterviewerThunk} from '../../store';

import css from './Interviewer.module.css';

const Interviewer = ({interviewer}) => {
    const {id, name, surname, skills, level} = interviewer;

    const dispatch = useDispatch();

    return (
        <div className={css.interviewer}>
            <div>Id: {id}</div>
            <div>Name: {name}</div>
            <div>Surname: {surname}</div>
            <div>Skills: {skills}</div>
            <div>Level: {levelEnum[level]}</div>
            <button onClick={() => dispatch(deleteInterviewerThunk({id}))}>Delete</button>
            <button onClick={() => dispatch(interviewerActions.interviewerToUpdate({interviewer}))}>Update</button>
        </div>
    );
};

export {Interviewer};