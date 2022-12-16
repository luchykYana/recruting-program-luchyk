import {useDispatch} from 'react-redux';

import {applicantActions, deleteApplicantThunk} from '../../store';
import {levelEnum} from '../../configs';

import css from './Applicant.module.css';

const Applicant = ({applicant}) => {
    const {id, name, surname, skills, level} = applicant;

    const dispatch = useDispatch();

    return (
        <div className={css.applicant}>
            <div>Id: {id}</div>
            <div>Name: {name}</div>
            <div>Surname: {surname}</div>
            <div>Skills: {skills}</div>
            <div>Level: {levelEnum[level]}</div>
            <button onClick={() => dispatch(deleteApplicantThunk({id}))}>Delete</button>
            <button onClick={() => dispatch(applicantActions.applicantToUpdate({applicant}))}>Update</button>
        </div>
    );
};

export {Applicant};