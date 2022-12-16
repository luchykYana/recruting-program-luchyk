import {Interview} from '../Interview/Interview';

import css from './SortedInterviewers.module.css';

const SortedInterviews = ({interviews}) => {

    return (
        <div className={`${css.values}`}>
            {interviews.map(item => <Interview key={item.id} interview={item}/>)}
        </div>
    );
};

export {SortedInterviews};