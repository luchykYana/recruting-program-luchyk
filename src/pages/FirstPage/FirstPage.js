import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

import {getAllInterviews} from '../../store';
import {SortedInterviews} from '../../components';

import css from './FirstPage.module.css';

const FirstPage = () => {
    const {interviews} = useSelector(state => state.interviewReducer);

    const [items, selectedItems] = useState([]);
    const [all, setAll] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllInterviews());
        setAll(interviews);
    }, []);

    useEffect(() => {
        const times = interviews.map(item => item.time);
        const set = new Set(times);
        const mas = [];
        set.forEach(item => mas.push(<option key={item} value={item}>{item}</option>))
        selectedItems(mas)
    }, [interviews])

    const change = (e) => {
        setAll(interviews.filter(item => item.time === e.target.value));
    }

    return (
        <div className={`${css.first}`}>
            <select id='interviews' name='interviews' onChange={change}>
                {items}
            </select>

            <div className={`${css.items}`}><SortedInterviews interviews={all}/></div>
        </div>
    );
};

export {FirstPage};