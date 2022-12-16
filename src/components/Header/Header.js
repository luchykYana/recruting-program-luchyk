import {NavLink} from 'react-router-dom';

import css from './Header.module.css';

const Header = () => {
    return (
        <div className={css.header}>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'applicants'}>Applicants</NavLink>
            <NavLink to={'interviewers'}>Interviewers</NavLink>
            <NavLink to={'interviews'}>Interviews</NavLink>
        </div>
    );
};

export {Header};