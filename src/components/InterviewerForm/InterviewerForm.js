import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';

import {InterviewerValidator} from '../../validators';
import {createInterviewerThunk, updateInterviewerThunk} from '../../store';

import css from '../ApplicantForm/ApplicantForm.module.css';

const InterviewerForm = () => {
    const {interviewerForUpdate} = useSelector(state => state.interviewerReducer);

    const {
        handleSubmit,
        register,
        formState: {errors},
        setValue,
        reset
    } = useForm({resolver: joiResolver(InterviewerValidator), mode: 'onTouched'});

    const dispatch = useDispatch();

    const submit = (data) => {
        console.log(data);
        const obj = {
            name: data.name,
            surname: data.surname,
            skills: data.skills.toString(),
            level: data.level
        }

        if (interviewerForUpdate) {
            dispatch(updateInterviewerThunk({id: interviewerForUpdate.id, interviewer: obj}));
        } else {
            dispatch(createInterviewerThunk(obj));
        }
        reset();
    }

    useEffect(() => {
        if (interviewerForUpdate) {
            setValue('name', interviewerForUpdate.name)
            setValue('surname', interviewerForUpdate.surname)
            setValue('skills', interviewerForUpdate.skills)
            setValue('level', interviewerForUpdate.level)
        }
    }, [interviewerForUpdate]);

    return (
        <form onSubmit={handleSubmit(submit)} className={css.form}>
            <div className={`${css.item} ${css.flex}`}>
                <label>Name: </label>
                <input type="text"
                       defaultValue={''} {...register('name')}/>
                <div>{errors.name?.message}</div>
            </div>

            <div className={`${css.item} ${css.flex}`}>
                <label>Surname: </label>
                <input type="text"
                       defaultValue={''} {...register('surname')}/>
                <div>{errors.surname?.message}</div>
            </div>

            <div className={`${css.item} ${css.flex}`}>
                <label>Skills: </label>
                <div>
                    <select multiple name="skills" defaultValue={[]} {...register('skills')}>
                        <option value="js">JS</option>
                        <option value="java">Java</option>
                        <option value="c#">C#</option>
                        <option value="c++">C++</option>
                        <option value="python">Python</option>
                    </select>
                </div>
            </div>

            <div className={`${css.item} ${css.flex}`}>
                <label>Level:</label>
                <select name="level" defaultValue={0} {...register('level')}>
                    <option value={0}>-- Select level --</option>
                    <option value={0}>Trainee</option>
                    <option value={1}>Junior</option>
                    <option value={2}>Middle</option>
                    <option value={3}>Senior</option>
                </select>
                <div>{errors.level?.message}</div>
            </div>

            <button>Save</button>
        </form>
    );
};

export {InterviewerForm};