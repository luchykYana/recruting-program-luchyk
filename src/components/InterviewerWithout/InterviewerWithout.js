import {useDispatch} from 'react-redux';

import css from '../Interviewer/Interviewer.module.css';
import {levelEnum} from '../../configs';

const InterviewerWithout = ({interviewer}) => {
    const {id, name, surname, skills, level} = interviewer;

    const dispatch = useDispatch();

    return (
        <div className={css.interviewer}>
            <div>Id: {id}</div>
            <div>Name: {name}</div>
            <div>Surname: {surname}</div>
            <div>Skills: {skills}</div>
            <div>Level: {levelEnum[level]}</div>
        </div>
    );
};

export {InterviewerWithout};