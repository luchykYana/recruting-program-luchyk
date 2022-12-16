import {InterviewerForm, Interviewers} from '../../components';

import css from './InterviewerPage.module.css';

const InterviewerPage = () => {
    return (
        <div className={css.interviewerPage}>
            <InterviewerForm/>
            <Interviewers/>
        </div>
    );
};

export {InterviewerPage};