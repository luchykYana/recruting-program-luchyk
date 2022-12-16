import {Route, Routes} from 'react-router-dom';

import {Layout} from './components';
import {ApplicantPage, FirstPage, InterviewerPage, InterviewPage, NotFoundPage} from './pages';

import css from './App.module.css';

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<FirstPage/>}/>

                <Route path={'applicants'} element={<ApplicantPage/>}/>

                <Route path={'interviewers'} element={<InterviewerPage/>}/>

                <Route path={'interviews'} element={<InterviewPage/>}/>

                <Route path={'*'} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    );
};

export {App};