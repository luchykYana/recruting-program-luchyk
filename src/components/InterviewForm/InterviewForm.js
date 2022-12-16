import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {useEffect, useState} from 'react';

import {createInterviewThunk, getAllApplicants, getAllInterviewers, updateInterviewThunk} from '../../store';
import {InterviewValidator} from '../../validators';

import css from './InterviewForm.module.css';

const InterviewForm = () => {
    const {interviewForUpdate} = useSelector(state => state.interviewReducer);
    const {applicants} = useSelector(state => state.applicantReducer);
    const {interviewers} = useSelector(state => state.interviewerReducer);

    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItems2, setSelectedItems2] = useState([]);

    const {
        handleSubmit,
        register,
        formState: {errors},
        setValue,
        reset
    } = useForm({resolver: joiResolver(InterviewValidator), mode: 'onTouched'});

    const dispatch = useDispatch();

    const submit = (data) => {
        const obj = {
            time: data.time,
            during: data.during,
            applicant: applicants.filter(item => item.id === +data.applicant)[0],
            interviewer: interviewers.filter(item => item.id === +data.interviewer)[0]
        }

        if (interviewForUpdate) {
            dispatch(updateInterviewThunk({id: interviewForUpdate.id, interview: obj}));
        } else {
            console.log(obj);
            dispatch(createInterviewThunk(obj));
        }
        reset();
    }

    useEffect(() => {
        if (interviewForUpdate) {
            setValue('time', interviewForUpdate.time)
            setValue('during', interviewForUpdate.during)
            setValue('applicant', interviewForUpdate.applicant)
            setValue('interviewer', interviewForUpdate.interviewer)
        }

        dispatch(getAllApplicants());
        dispatch(getAllInterviewers());
    }, [interviewForUpdate]);

    useEffect(() => {
        if(applicants) {
            setSelectedItems(applicants.map(item => <option key={item.id} value={item.id}>{item.id}. {item.name}</option>))
        }
    }, [applicants])

    useEffect(() => {
        if(interviewers) {
            setSelectedItems2(interviewers.map(item => <option key={item.id} value={item.id}>{item.id}. {item.name}</option>))
        }
    }, [interviewers])

    return (
        <form onSubmit={handleSubmit(submit)} className={css.form}>
            <div className={`${css.item} ${css.flex}`}>
                <label>Time: </label>
                <input type="text"
                       defaultValue={''} {...register('time')}/>
                <div>{errors.time?.message}</div>
            </div>

            <div className={`${css.item} ${css.flex}`}>
                <label>During: </label>
                <input type="number"
                       defaultValue={''} {...register('during')}/>
                <div>{errors.during?.message}</div>
            </div>

            <div className={`${css.item} ${css.flex}`}>
                <label>Applicant: </label>
                <div>
                    <select id='applicants' name='applicants' defaultValue={''} {...register('applicant')}>
                        {selectedItems}
                    </select>
                </div>
            </div>

            <div className={`${css.item} ${css.flex}`}>
                <label>Interviewer:</label>
                <div>
                    <select id='interviews' name='interviews' defaultValue={''} {...register('interviewer')}>
                        {selectedItems2}
                    </select>
                </div>
            </div>

            <button>Save</button>
        </form>
    );
};

export {InterviewForm};