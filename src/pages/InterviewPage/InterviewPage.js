import {InterviewForm, Interviews} from '../../components';

import css from './InterviewPage.module.css'

const InterviewPage = () => {
    return (
        <div className={css.interviewPage}>
            <InterviewForm/>
            <Interviews/>
        </div>
    );
};

export {InterviewPage};