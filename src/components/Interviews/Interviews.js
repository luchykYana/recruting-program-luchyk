import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import {getAllInterviews} from '../../store';
import {Interview} from '../Interview/Interview';

import css from './Interviews.module.css';

const Interviews = () => {
    const {interviews, status, error} = useSelector(state => state.interviewReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllInterviews());
    }, []);

    return (
        <div className={css.interviews}>
            {status === 'pending' && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
            {interviews.map(item => <Interview key={item.id} interview={item}/>)}
        </div>
    );
};

export {Interviews};