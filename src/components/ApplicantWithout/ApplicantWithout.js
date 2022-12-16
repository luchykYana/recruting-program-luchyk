import css from '../Applicant/Applicant.module.css';
import {levelEnum} from '../../configs';

const ApplicantWithout = ({applicant}) => {
    const {id, name, surname, skills, level} = applicant;

    return (
        <div className={css.applicant}>
            <div>Id: {id}</div>
            <div>Name: {name}</div>
            <div>Surname: {surname}</div>
            <div>Skills: {skills}</div>
            <div>Level: {levelEnum[level]}</div>
        </div>
    );
};

export {ApplicantWithout};