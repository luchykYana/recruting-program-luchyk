import {configureStore} from '@reduxjs/toolkit';

import applicantReducer from './applicant.slice';
import interviewerReducer from './interviewer.slice';
import interviewReducer from './interview.slice';

export const store = configureStore({
    reducer: {
        applicantReducer,
        interviewerReducer,
        interviewReducer
    }
})