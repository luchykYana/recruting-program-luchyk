import {ApplicantForm, Applicants} from '../../components';

import css from './ApplicantPage.module.css';

const ApplicantPage = () => {
    return (
        <div className={css.applicantPage}>
            <ApplicantForm/>
            <Applicants/>
        </div>
    );
};

export {ApplicantPage};